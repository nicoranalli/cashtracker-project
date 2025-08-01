export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'ARS'
    }).format(amount);
}

export function formatDate(dateString: string): string {
    // Crear un objeto Date a partir del string
    const date = new Date(dateString);

    // Obtener día, mes, año, horas y minutos
    const day = String(date.getDate()).padStart(2, '0'); // Día (01-31)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes (01-12)
    const year = date.getFullYear(); // Año (2025)
    const hours = String(date.getHours()).padStart(2, '0'); // Horas (00-23)
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutos (00-59)

    // Formatear la fecha en "dd-mm-aaaa hh:mm"
    return `${day}-${month}-${year} ${hours}:${minutes}`;
}
