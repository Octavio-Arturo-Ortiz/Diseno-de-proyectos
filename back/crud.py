from sqlalchemy.orm import Session

import models, schemas

def get_paciente(db: Session, paciente_id: int):
    return db.query(models.Paciente).filter(models.Paciente.id == paciente_id).first()

def get_pacientes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Paciente).offset(skip).limit(limit).all()

def get_citas(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Cita).offset(skip).limit(limit).all()

def get_cita(db: Session, id_cita: int):
    return db.query(models.Cita).filter(models.Cita.id == id_cita).first()

def create_paciente(db: Session, paciente: schemas.PacienteCreate):
    db_paciente = models.Paciente(
        nombre=paciente.nombre, 
        apaterno=paciente.apaterno,
        amaterno=paciente.amaterno,
        edad=paciente.edad,
        peso=paciente.peso,
        telefono=paciente.telefono,
        email=paciente.email
    )
    db.add(db_paciente)
    db.commit()
    db.refresh(db_paciente)
    return db_paciente


def create_cita_paciente(db: Session, cita: schemas.CitaCreate):
    db_cita = models.Cita(**cita.dict())
    db.add(db_cita)
    db.commit()
    db.refresh(db_cita)
    return db_cita





