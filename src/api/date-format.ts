export default function formatarData(dataString: string){
    const dataFormatada = new Date(dataString.replace(" ", "T"));
    const formatado = new Intl.DateTimeFormat('pt-BR', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
    }).format(dataFormatada);

    return formatado.charAt(0).toUpperCase() + formatado.slice(1);
}
