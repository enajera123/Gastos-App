export function generarId() {
    const random = Math.random().toString(36).substring(2);
    const date = Date.now().toString()
    return random + date
}
export function formatearFecha(fecha) {
    const fechaNueva = new Date(fecha);
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }
    return fechaNueva.toLocaleDateString('es-ES', opciones)
}