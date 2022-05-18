from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

import crud, models, schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

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

@app.get("/pacientes/{paciente_id}", response_model=schemas.Paciente)
def datos_paciente(paciente_id: int, db: Session = Depends(get_db)):
    db_paciente = crud.get_paciente(db, paciente_id)

    if db_paciente is None: 
        raise HTTPException(status_code=404, detail="Paciente no encontrado")

    return db_paciente
