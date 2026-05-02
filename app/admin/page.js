'use client';

import { useState } from 'react';

export default function Admin() {
  const [data, setData] = useState({
    groomName: 'Muhammad Bayu Ramadhan',
    groomFather: 'Bapak Suroso',
    groomMother: 'Ibu Tri Sayekti',
    brideName: 'Mutyara Nurhifa Orvalla Putri',
    brideFather: 'Bapak Henry Irwansson',
    brideMother: 'Ibu Fitria Andjani',
    date: '2026-05-14',
    day: 'Kamis',
    time: '08.00 - 10.00 WIB',
    location: 'Masjid Al-Munawwir',
    music: ''
  });
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState('');

  const addGuest = () => {
    if (newGuest.trim()) { setGuests([...guests, newGuest.trim()]); setNewGuest(''); }
  };

  const removeGuest = (i) => setGuests(guests.filter((_, idx) => idx !== i));

  const generateAllLinks = () => {
    const base = window.location.origin;
    const params = new URLSearchParams(data).toString();
    const links = guests.map(g => `${base}/?to=${encodeURIComponent(g)}&${params}`).join('\n');
    setGeneratedLink(links);
    navigator.clipboard.writeText(links);
    setCopied('✅ semua link!');
    setTimeout(() => setCopied(''), 3000);
  };

  const copyOneLink = (guest) => {
    const base = window.location.origin;
    const params = new URLSearchParams(data).toString();
    const link = `${base}/?to=${encodeURIComponent(guest)}&${params}`;
    navigator.clipboard.writeText(link);
    setCopied(`✅ ${guest}!`);
    setTimeout(() => setCopied(''), 2000);
  };

  const updateField = (field, value) => setData({...data, [field]: value});

  return (
    <div style={{maxWidth: '600px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif'}}>
      <h1>🎊 Generator Link Undangan</h1>
      <p style={{color: '#666', marginBottom: '1.5rem'}}>Isi data, tambah tamu, generate link!</p>

      <div style={{background: '#f5f5f5', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem'}}>
        <h3>📅 Data Acara</h3>
        <input type="text" placeholder="Hari (Kamis)" value={data.day} onChange={e => updateField('day', e.target.value)} style={inputStyle} />
        <input type="date" value={data.date} onChange={e => updateField('date', e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Jam" value={data.time} onChange={e => updateField('time', e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Lokasi" value={data.location} onChange={e => updateField('location', e.target.value)} style={inputStyle} />
        <input type="text" placeholder="Music (URL MP3)" value={data.music} onChange={e => updateField('music', e.target.value)} style={inputStyle} />
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
        <h3>👥 Daftar Tamu ({guests.length})</h3>
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <input type="text" placeholder="Nama tamu" value={newGuest} onChange={e => setNewGuest(e.target.value)} onKeyDown={e => e.key === 'Enter' && addGuest()} style={{flex: 1, padding: '0.75rem'}} />
          <button onClick={addGuest} style={btnStyle}>+ Tambah</button>
        </div>
        <ul style={{marginTop: '1rem', listStyle: 'none', padding: 0}}>
          {guests.map((guest, i) => (
            <li key={i} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', borderBottom: '1px solid #ddd'}}>
              <span style={{flex: 1}}>{guest}</span>
              <button onClick={() => copyOneLink(guest)} style={{padding: '0.4rem 0.6rem', fontSize: '0.75rem', background: '#C9A86C', border: 'none', borderRadius: '4px', cursor: 'pointer', whiteSpace: 'nowrap'}}>📋 Copy</button>
              <button onClick={() => removeGuest(i)} style={{color: 'red', border: 'none', background: 'none', cursor: 'pointer', padding: '0.4rem'}}>✕</button>
            </li>
          ))}
        </ul>
        {guests.length > 0 && (
          <button onClick={generateAllLinks} style={{...btnStyle, background: '#C9A86C', width: '100%', marginTop: '1rem'}}>
            {copied || '🔗 Copy Semua Link'}
          </button>
        )}
      </div>

      {generatedLink && (
        <details style={{marginTop: '1rem'}}>
          <summary style={{cursor: 'pointer', color: '#666'}}>📋 Lihat Semua Link</summary>
          <pre style={{background: '#f5f5f5', padding: '1rem', overflow: 'auto', fontSize: '0.75rem', marginTop: '0.5rem', whiteSpace: 'pre-wrap', wordBreak: 'break-all'}}>{generatedLink}</pre>
        </details>
      )}
    </div>
  );
}

const inputStyle = {width: '100%', padding: '0.75rem', marginBottom: '0.5rem', border: '1px solid #ddd', borderRadius: '4px'};
const btnStyle = {padding: '0.75rem 1.5rem', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem'};