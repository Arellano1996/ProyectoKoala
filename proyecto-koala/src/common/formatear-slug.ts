
export const formatearSlug = (slug: string) => {
    return slug
    .toLowerCase()
    .replaceAll(' ', '_')
    .replaceAll('á', 'a')
    .replaceAll('é', 'e')
    .replaceAll('í', 'i')
    .replaceAll('ó', 'o')
    .replaceAll('ú', 'u')
}