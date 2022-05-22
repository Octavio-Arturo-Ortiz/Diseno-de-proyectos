from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import crud, models, schemas
from database import SessionLocal, engine

# Configuration

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["*"]

app.add_middleware(CORSMiddleware, allow_origins=origins)

# Dependencia - Obtiene la BD
def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally:
        db.close()
    

# Path Operations for Creating Data
@app.post("/pacientes/", response_model=schemas.Paciente)
def registro_paciente(paciente: schemas.PacienteCreate, db: Session = Depends(get_db)):
    # Validaciones extra
    return crud.create_paciente(db=db, paciente=paciente)

@app.post("/citas/", response_model=schemas.Cita)
def registro_cita(cita: schemas.CitaCreate, db: Session = Depends(get_db)):
    return crud.create_cita_paciente(db=db, cita=cita)

# Path Operations for Reading Data

@app.get("/citas/{id_cita}", response_model=schemas.Cita)
def get_cita(id_cita: int, db: Session = Depends(get_db)):
    db_cita = crud.get_cita(db, id_cita)

    if db_cita is None:
        raise HTTPException(status_code=404, detail="Cita no encontrada")
    
    return db_cita

@app.get("/citas/", response_model=list[schemas.Cita])
def consultar_citas(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    citas = crud.get_citas(db, skip=skip, limit=limit)
    return citas

@app.get("/pacientes/{id_paciente}", response_model=schemas.Paciente)
def datos_paciente(id_paciente: int, db: Session = Depends(get_db)):
    db_paciente = crud.get_paciente(db, id_paciente)

    if db_paciente is None: 
        raise HTTPException(status_code=404, detail="Paciente no encontrado")

    return db_paciente


@app.get("/pacientes/", response_model=list[schemas.Paciente])
def get_paciente(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    pacientes = crud.get_pacientes(db, skip, limit)
    return pacientes

# Path Operations for Updating Data

@app.put("/pacientes/{id_paciente}", response_model=schemas.Paciente)
def modificar_paciente(id_paciente: int, paciente: schemas.Paciente, db: Session = Depends(get_db)):
    return crud.update_paciente(id_paciente, db, paciente)


@app.put("/citas/{id_cita}", response_model=schemas.Cita)
def modificar_cita(id_cita: int, cita: schemas.CitaCreate, db: Session = Depends(get_db)):
    return crud.update_cita(id_cita, db, cita)