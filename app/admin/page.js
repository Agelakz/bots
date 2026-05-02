'use client';

import { useState, useEffect } from 'react';

const DEFAULT_DATA = {
  groomName: 'Muhammad Bayu Ramadhan',
  groomFather: 'Bapak Suroso',
  groomMother: 'Ibu Tri Sayekti',
  brideName: 'Mutyara Nurhifa Orvalla Putri',
  brideFather: 'Bapak Henry Irwansson',
  brideMother: 'Ibu Fitria Andjani',
  weddingDate: '2026-05-14',
  weddingDay: 'Kamis',
  akadTime: '08.00 - 10.00 WIB',
  akadLocation: 'Masjid Al-Munawwir',
  music: '',
  guests: []
};

export default function Admin() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [newGuest, setNewGuest] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('weddingData');
    if (savedData) setData(JSON.parse(savedData));
  }, []);

  const handleSave = () => {
    localStorage.setItem('weddingData', JSON.stringify(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addGuest = () => {
    if (newGuest.trim()) {
      setData({...data, guests: [...data.guests, newGuest.trim()]});
      setNewGuest('');
    }
  };

  const removeGuest = (index) => {
    const guests = [...data.guests];
    guests.splice(index, 1);
    setData({...data, guests});
  };

  const exportConfig = () => {
    const config = `const WEDDING_DATA = {
  groom: { name: '${data.groomName}', father: '${data.groomFather}', mother: '${data.groomMother}', image: 'https://res.cloudinary.com/dhkwhynff/image/upload/v1777706117/Pngtree_indonesian_wedding_couple_wear_white_6431502_ztq8dh.png' },
  bride: { name: '${data.brideName}', father: '${data.brideFather}', mother: '${data.brideMother}', image: 'https://res.cloudinary.com/dhkwhynff/image/upload/v1777706117/Pngtree_indonesian_wedding_couple_wear_white_6431502_ztq8dh.png' },
  date: '${data.weddingDate}',
  day: '${data.weddingDay}',
  music: '${data.music}',
  events: [{ name: 'AKAD NIKAH', date: '${data.weddingDay}, ${new Date(data.weddingDate).toLocaleDateString('id-ID', {day:'numeric',month:'long',year:'numeric'})}', time: '${data.akadTime}', location: '${data.akadLocation}' }]
};`;
    navigator.clipboard.copyText(config);
    alert('Config copied! Paste di page.js');
  };

  return (
    <div style={{maxWidth: '600px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif'}}>
      <h1>Admin Panel 🎊</h1>
      <p style={{color: '#666', marginBottom: '2rem'}}>Edit undangan tanpa ribet!</p>

      <div style={{background: '#f5f5f5', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem'}}>
        <h3>👨‍🦱 Data Mempelai</h3>
        <input type="text" placeholder="Nama Pengantin Pria" value={data.groomName} onChange={e => setData({...data, groomName: e.target.value})} style={inputStyle} />
        <input type="text" placeholder="Ayah Pengantin Pria" value={data.groomFather} onChange={e => setData({...data, groomFather: e.target.value})} style={inputStyle} />
        <input type="text" placeholder="Ibu Pengantin Pria" value={data.groomMother} onChange={e => setData({...data, groomMother: e.target.value})} style={inputStyle} />
        <input type="text" placeholder="Nama Pengantin Wanita" value={data.brideName} onChange={e => setData({...data, brideName: e.target.value})} style={inputStyle} />
        <input type="text" placeholder="Ayah Pengantin Wanita" value={data.brideFather} onChange={e => setData({...data, brideFather: e.target.value})} style={inputStyle} />
        <input type="text" placeholder="Ibu Pengantin Wanita" value={data.brideMother} onChange={e => setData({...data, brideMother: e.target.value})} style={inputStyle} />
      </div>

      <div style={{background: '#f5f5f5', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem'}}>
        <h3>📅 Data Acara</h3>
        <input type="text" placeholder="Hari (Kamis)" value={data.weddingDay} onChange={e => setData({...data, weddingDay: e.target.value})} style={inputStyle} />
        <input type="date" value={data.weddingDate} onChange={e => setData({...data, weddingDate: e.target.value})} style={inputStyle} />
        <input type="text" placeholder="Jam Akad" value={data.akadTime} onChange={e => setData({...data, akadTime: e.target.value})} style={inputStyle} />
        <input type="text" placeholder="Lokasi Akad" value={data.akadLocation} onChange={e => setData({...data, akadLocation: e.target.value})} style={inputStyle} />
        <input type="text" placeholder="Link Music (MP3)" value={data.music} onChange={e => setData({...data, music: e.target.value})} style={inputStyle} />
      </div>

      <div style={{background: '#f5f5f5', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem'}}>
        <h3>👥 Daftar Tamu</h3>
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <input type="text" placeholder="Nama tamu baru" value={newGuest} onChange={e => setNewGuest(e.target.value)} onKeyDown={e => e.key === 'Enter' && addGuest()} style={{flex: 1, padding: '0.75rem'}} />
          <button onClick={addGuest} style={btnStyle}>+ Tambah</button>
        </div>
        <ul style={{marginTop: '1rem', listStyle: 'none', padding: 0}}>
          {data.guests.map((guest, i) => (
            <li key={i} style={{display: 'flex', justifyContent: 'space-between', padding: '0.5rem', borderBottom: '1px solid #ddd'}}>
              {guest}
              <button onClick={() => removeGuest(i)} style={{color: 'red', border: 'none', background: 'none', cursor: 'pointer'}}>✕</button>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleSave} style={{...btnStyle, background: '#C9A86C', width: '100%', marginBottom: '1rem'}}>
        {saved ? '✅ Tersimpan!' : '💾 Simpan'}
      </button>

      <button onClick={exportConfig} style={{...btnStyle, background: '#333', color: '#fff', width: '100%'}}>
        📋 Export ke page.js
      </button>

      <p style={{marginTop: '2rem', color: '#999', fontSize: '0.8rem'}}>
        Cara: 1. Edit data di atas 2. Klik Export 3. Paste di page.js
      </p>
    </div>
  );
}

const inputStyle = {width: '100%', padding: '0.75rem', marginBottom: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'};
const btnStyle = {padding: '0.75rem 1.5rem', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem'};