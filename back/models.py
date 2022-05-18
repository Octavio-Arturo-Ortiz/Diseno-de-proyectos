from sqlalchemy import Boolean, Column, Float, ForeignKey, Integer, String, Date, Time
from sqlalchemy.orm import relationship

from database import Base

class Paciente(Base):

    __tablename__ = "pacientes"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable= False)
    apaterno = Column(String, nullable= False)
    amaterno = Column(String)
    edad = Column(Integer)
    peso = Column(Float)
    telefono = Column(String(length=10))
    email = Column(String)

    cita = relationship("Cita", back_populates="paciente")

class Cita(Base):

    __tablename__ = "citas"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable= False)
    apaterno = Column(String, nullable= False)
    amaterno = Column(String)
    fecha = Column(Date)
    hora = Column(Time)
    id_paciente = Column(Integer, ForeignKey("pacientes.id"))

    paciente = relationship("Paciente", back_populates="cita")



