export function formatNumberRupiah(param: number) {
    return new Intl.NumberFormat('id', {
        currency: 'IDR', style: 'currency', maximumFractionDigits: 0
    }).format(param)
}

export function formatNumberRibuan(param: number) {
    return new Intl.NumberFormat('id', {
        maximumFractionDigits: 0
    }).format(param)
}