'use client';

import { useState } from 'react';

export default function Admin() {
  const [data, setData] = useState({
    groomName: 'Muhammad Bayu Ramadhan',
    groomFather: 'Bapak Suroso',
    groomMother: 'Ibu Tri Sayekti',
    brideName: 'Mutyara Nurhifa Orvalla Putri',
    brideFather: 'Bapak Henry Irwansyah',
    brideMother: 'Ibu Fitria Andjani',
    date: '2026-05-14',
    day: 'Kamis',
    time: '09.00 - 12.00 WITA',
    location: 'Cangkop Haraken Space, Mall Ocean Square Balikpapan, Lt. GF, Klandasan Ilir, Kec. Balikpapan Kota, Kota Balikpapan, Kalimantan Timur 76411 https://www.google.com/maps/place/Cangkop+Haraken+Space/@-1.2768428,116.8409418,19z/data=!4m6!3m5!1s0x2df1478e7b5f09ef:0x92c164f46f872c46!8m2!3d-1.2769234!4d116.8409623!16s%2Fg%2F11v0wtyq38?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D',
    music: ''
  });
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState('');
  const [saved, setSaved] = useState('');

  // Save data to cookie
  const saveToCookie = () => {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1); // 1 year
    document.cookie = `weddingData=${JSON.stringify(data)};expires=${expires.toUTCString()};path=/`;
    setSaved('✅ Data tersimpan!');
    setTimeout(() => setSaved(''), 2000);
  };

  const addGuest = () => {
    if (newGuest.trim()) {
      const guestData = { ...data, guestName: newGuest.trim() };
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      document.cookie = `wedding_${encodeURIComponent(newGuest.trim())}=${JSON.stringify(guestData)};expires=${expires.toUTCString()};path=/`;
      setGuests([...guests, newGuest.trim()]);
      setNewGuest('');
    }
  };

  const removeGuest = (i) => setGuests(guests.filter((_, idx) => idx !== i));

  const copyLink = (guest) => {
    const base = window.location.origin;
    navigator.clipboard.writeText(`${base}/?to=${encodeURIComponent(guest)}`);
    setSaved(`✅ Link ${guest}!`);
    setTimeout(() => setSaved(''), 2000);
  };

  const generateAllLinks = () => {
    const base = window.location.origin;
    const links = guests.map(g => `${base}/?to=${encodeURIComponent(g)}`).join('\n');
    navigator.clipboard.writeText(links);
    setSaved('✅ Semua link!');
    setTimeout(() => setSaved(''), 2000);
  };

  const updateField = (field, value) => setData({...data, [field]: value});

  return (
    <div style={{maxWidth: '600px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif'}}>
      <h1>🎊 Admin Undangan</h1>
      <p style={{color: '#666', marginBottom: '1.5rem'}}>Simpan data, tambah tamu, jadiin link!</p>

      <button onClick={saveToCookie} style={{...btnStyle, background: '#C9A86C', width: '100%', marginBottom: '1.5rem'}}>
        {saved || '💾 Simpan Data'}
      </button>

      <div style={{background: '#f5f5f5', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem'}}>
        <h3>📅 Data Acara</h3>
        <input type="text" placeholder="Hari" value={data.day} onChange={e => updateField('day', e.target.value)} style={inputStyle} />
        <input type="date" value={data.date} onChange={e => updateField('date', e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Jam" value={data.time} onChange={e => updateField('time', e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Lokasi" value={data.location} onChange={e => updateField('location', e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Music (URL)" value={data.music} onChange={e => updateField('music', e.target.value)} style={inputStyle} />
      </div>

      <div style={{background: '#f5f5f5', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem'}}>
        <h3>👨‍🦱 Mempelai</h3>
        <input type="text" placeholder="Nama Pria" value={data.groomName} onChange={e => updateField('groomName', e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Ayah Pria" value={data.groomFather} onChange={e => updateField('groomFather', e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Ibu Pria" value={data.groomMother} onChange={e => updateField('groomMother', e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Nama Wanita" value={data.brideName} onChange={e => updateField('brideName', e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Ayah Wanita" value={data.brideFather} onChange={e => updateField('brideFather', e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Ibu Wanita" value={data.brideMother} onChange={e => updateField('brideMother', e.target.value)} style={inputStyle} />
      </div>

      <div style={{background: '#f5f5f5', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem'}}>
        <h3>👥 Tamu ({guests.length})</h3>
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <input type="text" placeholder="Nama tamu" value={newGuest} onChange={e => setNewGuest(e.target.value)} onKeyDown={e => e.key === 'Enter' && addGuest()} style={{flex: 1, padding: '0.75rem'}} />
          <button onClick={addGuest} style={btnStyle}>+</button>
        </div>
        <ul style={{marginTop: '1rem', listStyle: 'none', padding: 0}}>
          {guests.map((guest, i) => (
            <li key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', borderBottom: '1px solid #ddd'}}>
              <span>{guest}</span>
              <div style={{display: 'flex', gap: '0.5rem'}}>
                <button onClick={() => copyLink(guest)} style={{padding: '0.3rem 0.6rem', fontSize: '0.7rem', background: '#C9A86C', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>📋</button>
                <button onClick={() => removeGuest(i)} style={{color: 'red', border: 'none', background: 'none', cursor: 'pointer'}}>✕</button>
              </div>
            </li>
          ))}
        </ul>
        {guests.length > 0 && (
          <button onClick={generateAllLinks} style={{...btnStyle, background: '#333', color: '#fff', width: '100%', marginTop: '1rem'}}>
            🔗 Copy Semua Link
          </button>
        )}
      </div>

      <p style={{fontSize: '0.8rem', color: '#999'}}>
        Cara: 1. Isi data 2. Klik 💾 Simpan 3. Buka /admin lg buat generate link
      </p>
    </div>
  );
}

const inputStyle = {width: '100%', padding: '0.75rem', marginBottom: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'};
const btnStyle = {padding: '0.75rem 1.5rem', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem'};
