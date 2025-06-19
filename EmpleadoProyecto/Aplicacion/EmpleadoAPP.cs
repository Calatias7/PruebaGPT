using Negocio;
using Dominio;
using System;

namespace Aplicacion
{
    public class EmpleadoAPP
    {
        private readonly EmpleadoBLL empleadoBLL = new();

        public void MostrarEmpleados()
        {
            var empleados = empleadoBLL.ObtenerEmpleados();
            foreach (Empleado emp in empleados)
            {
                Console.WriteLine($"{emp.Id} - {emp.Nombre} - {emp.Departamento}");
            }
        }
    }
}
