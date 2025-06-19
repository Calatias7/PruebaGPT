using Datos;
using Dominio;
using System.Collections.Generic;

namespace Negocio
{
    public class EmpleadoBLL
    {
        private readonly EmpleadoDAL empleadoDAL = new();

        public List<Empleado> ObtenerEmpleados()
        {
            return empleadoDAL.ObtenerTodos();
        }
    }
}
