from datetime import date, time
from pydantic import BaseModel, Field

class PacienteBase(BaseModel):
    nombre: str = Field(..., min_length=1)
    apaterno: str | None = None
    amaterno: str | None = None
    edad : int | None = Field(..., gt=0)
    peso : float | None = Field(..., gt=0)
    telefono : str | None = None
    email : str | None = None

class PacienteCreate(PacienteBase):
    pass

class Paciente(PacienteBase):
    id: int

    class Config:
        orm_mode = True

class CitaBase(BaseModel):
    nombre: str = Field(..., min_length=1)
    apaterno: str | None = None
    amaterno: str | None = None
    fecha : date | None = None
    hora : time | None = None

class CitaCreate(CitaBase):
    id_paciente: int
    pass

class Cita(CitaBase):
    id: int
    paciente: Paciente


    class Config:
        orm_mode = True