using Oracle.ManagedDataAccess.Client;

namespace Transversal
{
    public static class ConexionOracle
    {
        private const string CadenaConexion = "User Id=usuario;Password=clave;Data Source=localhost:1521/XE";

        public static OracleConnection ObtenerConexion()
        {
            var conexion = new OracleConnection(CadenaConexion);
            conexion.Open();
            return conexion;
        }
    }
}
