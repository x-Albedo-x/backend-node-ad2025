import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import empleadoRepository from '../repositories/empleado.repository.js';
import EmpleadoModel  from '../models/empleado.model.js';

export default{
    async createEmpleado(data){
        const { nombre, apaterno, amaterno, usuario, password } = data

        //Validamos nombre completo
        const nombreDuplicado = await empleadoRepository.findByFullName(nombre, apaterno, amaterno)
        if(nombreDuplicado){
            throw new Error('Ya existe un empleado con el mismo nombre')
        }
        const usuarioDuplicadoo = await empleadoRepository.findByFullUsuario(usuario)
        if(usuarioDuplicadoo){
            throw new Error('Ya existe un empleado con el mismo usuario')
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const empleadoNuevo = new EmpleadoModel({
            ...data,
            password: hashedPassword
        })
        return empleadoRepository.create(...empleadoNuevo) // los tres puntos siverve para igualar el objeto a los parametros del metodo create del repositorio osea sirve como para guardar dentro del objeto mediante igualacion
    }
}