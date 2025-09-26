// lib/filter.ts

import {Filter} from 'bad-words';

// Inisialisasi filter
const filter = new Filter();

// Daftar kata-kata kasar/kotor/vulgar dalam Bahasa Indonesia
// Disusun berdasarkan kata-kata berlabel 'kasar' & 'vulgar' di KBBI serta penggunaan umum.
export const indonesianBadWords = [
    // Umpatan Umum & Kata Sifat Kasar
    'asu',
    'anjing',
    'anjir',
    'anjrit',
    'bangsat',
    'bajingan',
    'banci',
    'bego',
    'brengsek',
    'babi',
    'bodoh',
    'celeng',
    'cupu',
    'cuk',
    'jancok',
    'dancok',
    'goblok',
    'gila',
    'keparat',
    'kurang ajar',
    'kampret',
    'kunyuk',
    'laknat',
    'monyet',
    'pecun',
    'sialan',
    'setan',
    'sinting',
    'sontoloyo',
    'tolol',
    'tai',
    'kere',

    // Bagian Tubuh & Aktivitas Seksual (Vulgar)
    'kontol',
    'memek',
    'jembut',
    'ngentot',
    'perek',
    'pelacur',
    'itil',
    'bokep',
    'coli',
    'ngewe',
    'pentil',
    'titit',
    'toket',
    'tetek',

    // Kata Turunan atau Variasi
    'asu',
    'bgst',
    'bgsd',
    'jncok',
    'kntl',
    'mmk'
];

filter.addWords(...indonesianBadWords);

export default filter;