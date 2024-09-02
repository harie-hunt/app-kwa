import { delay } from '$lib/utils/delay';
import type { Rekap } from '$lib/utils/type';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        promise_rekap: getRekap(),
        promise_belum_transaksi: getTransaksi()
    };
}) satisfies PageServerLoad;


async function getRekap(): Promise<Rekap> {
    await delay()
    return {
        anggota: 43,
        simpanan: 12450000,
        pinjaman: 11000000
    }
}

type TransaksiWithAnggota = {
    anggota: {
        no: string
        nama: string
    }
} & {
    id: string
    anggota_id: string
    nilai: number
    tahun: number
} & ({
    jenis: 'simpanan_pokok'

} | {
    jenis: 'simpanan_wajib'
    bulan: number
})

async function getTransaksi() {
    await delay()
    const data: TransaksiWithAnggota[] = [
        { id: '1', anggota_id: '1', anggota: { no: 'a1', nama: "Aji" }, jenis: 'simpanan_wajib', nilai: 100000, bulan: 1, tahun: 2024 },
        { id: '2', anggota_id: '2', anggota: { no: 'a2', nama: "Ani" }, jenis: 'simpanan_wajib', bulan: 2, nilai: 100000, tahun: 2024 },
        { id: '3', anggota_id: '2', anggota: { no: 'a2', nama: "Ani" }, jenis: 'simpanan_pokok', nilai: 100000, tahun: 2024 },
        { id: '4', anggota_id: '1', anggota: { no: 'a1', nama: "Aji" }, jenis: 'simpanan_pokok', nilai: 100000, tahun: 2024 },
    ]



    const aa = data.reduce((cur, val) => {
        const jenis = val.jenis
        if (!cur[jenis]) {
            cur[jenis] = []
        }
        cur[jenis].push(val)
        return cur
    }, {} as Record<TransaksiWithAnggota['jenis'], TransaksiWithAnggota[]>)
    return aa
}