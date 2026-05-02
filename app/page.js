'use client';

import { useState, useEffect } from 'react';

const DEFAULT = {
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
};

function parseURLParams() {
  if (typeof window === 'undefined') return DEFAULT;
  const params = new URLSearchParams(window.location.search);
  return {
    groomName: params.get('groom') || DEFAULT.groomName,
    groomFather: params.get('groomFather') || params.get('father') || DEFAULT.groomFather,
    groomMother: params.get('groomMother') || params.get('mother') || DEFAULT.groomMother,
    brideName: params.get('bride') || DEFAULT.brideName,
    brideFather: params.get('brideFather') || params.get('father2') || DEFAULT.brideFather,
    brideMother: params.get('brideMother') || params.get('mother2') || DEFAULT.brideMother,
    date: params.get('date') || DEFAULT.date,
    day: params.get('day') || DEFAULT.day,
    time: params.get('time') || DEFAULT.time,
    location: params.get('location') || DEFAULT.location,
    music: params.get('music') || ''
  };
}

function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;
      if (diff > 0) {
        setTimeLeft({ days: Math.floor(diff / (1000 * 60 * 60 * 24)), hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)), seconds: Math.floor((diff % (1000 * 60)) / 1000) });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  return (
    <div className="countdown">
      <div className="countdown-item"><span className="countdown-number">{String(timeLeft.days).padStart(2, '0')}</span><span className="countdown-label">Hari</span></div>
      <div className="countdown-item"><span className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</span><span className="countdown-label">Jam</span></div>
      <div className="countdown-item"><span className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</span><span className="countdown-label">Menit</span></div>
      <div className="countdown-item"><span className="countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</span><span className="countdown-label">Detik</span></div>
    </div>
  );
}

export default function Home() {
  const [data, setData] = useState(DEFAULT);
  const [guestName, setGuestName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setData(parseURLParams());
    const params = new URLSearchParams(window.location.search);
    setGuestName(params.get('to') || '');
  }, []);

  const openInvitation = () => {
    setIsOpen(true);
    if (data.music) { new Audio(data.music).play().catch(() => {}); }
  };

  return (
    <main>
      {!isOpen && <section className="cover"><div className="cover-content"><h1>Wedding Invitation</h1><p className="invitation-title">Undangan Pernikahan</p><p className="guest-message">Kepada Yth. {guestName || 'Tamu Undangan'}</p><button className="open-btn" onClick={openInvitation}>Buka Undangan</button></div></section>}
      {isOpen && (<>
        <section className="cover"><div className="cover-content"><p className="invitation-title">Undangan Pernikahan</p><h1>{data.groomName.split(' ').slice(0,2).join(' ')}</h1><span className="ampersand">&</span><h1 className="names">{data.brideName.split(' ').slice(0,2).join(' ')}</h1><p className="guest-message">{data.day}, {new Date(data.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p></div></section>
        <section className="countdown-section"><p className="countdown-title">Hitung Mundur</p><p className="countdown-date">{data.day}, {new Date(data.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p><Countdown targetDate={data.date} /></section>
        <section className="salam-section"><h2>Assalamu&apos;alaykum</h2><p className="salam-text">Maha Suci Allah yang telah menciptakan pasangan manusia untuk saling mencintai. Dengan memohon rahmat dan ridho-NYA, kami bermaksud mengundang Anda untuk menyaksikan jenjang hidup kami.</p></section>
        <section className="couple-section"><div className="container"><div className="couple-card"><img src="https://res.cloudinary.com/dhkwhynff/image/upload/v1777706117/Pngtree_indonesian_wedding_couple_wear_white_6431502_ztq8dh.png" alt={data.groomName} className="couple-img" /><h3 className="couple-name">{data.groomName}</h3><p className="couple-parents">Putra dari {data.groomFather} & {data.groomMother}</p></div><span className="ampersand">&</span><div className="couple-card"><img src="https://res.cloudinary.com/dhkwhynff/image/upload/v1777706117/Pngtree_indonesian_wedding_couple_wear_white_6431502_ztq8dh.png" alt={data.brideName} className="couple-img" /><h3 className="couple-name">{data.brideName}</h3><p className="couple-parents">Putri dari {data.brideFather} & {data.brideMother}</p></div></div></section>
        <section className="event-section"><h2 className="section-title">Jadwal Acara</h2><div className="events-grid"><div className="event-card"><h3>AKAD NIKAH</h3><p className="date">{data.day}, {new Date(data.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p><p className="time">{data.time}</p><p className="location">{data.location}</p></div></div></section>
        <section className="closing-section"><h2>Terima Kasih</h2><p className="closing-text">Kehadiran Anda merupakan kebahagiaan bagi kami.</p></section>
        <footer><p>{data.groomName.split(' ')[0]} & {data.brideName.split(' ')[0]}</p></footer>
      </>)}
    </main>
  );
}