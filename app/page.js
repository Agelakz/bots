'use client';

import { useState, useEffect } from 'react';

const WEDDING_DATA = {
  groom: {
    name: 'Bayu Ramadhan',
    father: 'Bapak Suroso',
    mother: 'Ibu Tri Sayekti',
    image: 'https://res.cloudinary.com/dhkwhynff/image/upload/v1777706117/Pngtree_indonesian_wedding_couple_wear_white_6431502_ztq8dh.png'
  },
  bride: {
    name: 'Tyara Nurhifa',
    father: 'Bapak Henry Irwansyah',
    mother: 'Ibu Fitria Andjani',
    image: 'https://res.cloudinary.com/dhkwhynff/image/upload/v1777706117/Pngtree_indonesian_wedding_couple_wear_white_6431502_ztq8dh.png'
  },
  date: '2026-05-14',
  day: 'Kamis',
  music: '',
  events: [
    {
      name: 'AKAD NIKAH',
      date: 'Kamis, 14 Mei 2026',
      time: '08.00 - 10.00 WIB',
      location: 'Masjid Al-Munawwir'
    }
  ]
};

function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  return (
    <div className="countdown">
      <div className="countdown-item">
        <span className="countdown-number">{String(timeLeft.days).padStart(2, '0')}</span>
        <span className="countdown-label">Hari</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="countdown-label">Jam</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="countdown-label">Menit</span>
      </div>
      <div className="countdown-item">
        <span className="countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="countdown-label">Detik</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [guestName, setGuestName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [wishes, setWishes] = useState([]);
  const [form, setForm] = useState({ name: '', message: '', presence: 'Hadir' });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setGuestName(params.get('to') || '');
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.message) {
      setWishes([...wishes, form]);
      setForm({ name: '', message: '', presence: 'Hadir' });
    }
  };

  const openInvitation = () => {
    setIsOpen(true);
    if (WEDDING_DATA.music) {
      const audio = new Audio(WEDDING_DATA.music);
      audio.play().catch(() => {});
    }
  };

  return (
    <main>
      {!isOpen && (
        <section className="cover">
          <div className="cover-content">
            <h1>Wedding Invitation</h1>
            <p className="invitation-title">Undangan Pernikahan</p>
            <p className="guest-message">Kepada Yth. {guestName || 'Tamu Undangan'}</p>
            <button className="open-btn" onClick={openInvitation}>Buka Undangan</button>
          </div>
        </section>
      )}
      
      {isOpen && (
        <>
          <section className="cover">
            <div className="cover-content">
              <p className="invitation-title">Undangan Pernikahan</p>
              <h1>{WEDDING_DATA.groom.name.split(' ').slice(0,2).join(' ')}</h1>
              <span className="ampersand">&</span>
              <h1 className="names">{WEDDING_DATA.bride.name.split(' ').slice(0,2).join(' ')}</h1>
              <p className="guest-message">{WEDDING_DATA.day}, {new Date(WEDDING_DATA.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </section>

          <section className="countdown-section">
            <p className="countdown-title">Hitung Mundur</p>
            <p className="countdown-date">{WEDDING_DATA.day}, {new Date(WEDDING_DATA.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <Countdown targetDate={WEDDING_DATA.date} />
          </section>

          <section className="salam-section">
            <h2>Assalamu'alaikum</h2>
            <p className="salam-text"> Maha Suci Allah yang telah menciptakan pasangan manusia untuk saling mencintai. Dengan memohon rahmat dan ridho-NYA, kami bermaksud mengundang Anda untuk menyaksikan jenjang hidup kami.</p>
          </section>

          <section className="couple-section">
            <div className="container">
              <div className="couple-card">
                <img src={WEDDING_DATA.groom.image} alt={WEDDING_DATA.groom.name} className="couple-img" />
                <h3 className="couple-name">{WEDDING_DATA.groom.name}</h3>
                <p className="couple-parents">Putra dari {WEDDING_DATA.groom.father} & {WEDDING_DATA.groom.mother}</p>
              </div>
              <span className="ampersand">&</span>
              <div className="couple-card">
                <img src={WEDDING_DATA.bride.image} alt={WEDDING_DATA.bride.name} className="couple-img" />
                <h3 className="couple-name">{WEDDING_DATA.bride.name}</h3>
                <p className="couple-parents">Putri dari {WEDDING_DATA.bride.father} & {WEDDING_DATA.bride.mother}</p>
              </div>
            </div>
          </section>

          <section className="event-section">
            <h2 className="section-title">Jadwal Acara</h2>
            <div className="events-grid">
              {WEDDING_DATA.events.map((event, i) => (
                <div key={i} className="event-card">
                  <h3>{event.name}</h3>
                  <p className="date">{event.date}</p>
                  <p className="time">{event.time}</p>
                  <p className="location">{event.location}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="wishes-section">
            <h2 className="section-title">Ucapan & Doa</h2>
            <form className="wishes-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nama</label>
                <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Nama Anda" required />
              </div>
              <div className="form-group">
                <label>Ucapan</label>
                <textarea value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} placeholder="Tulis ucapan..." required />
              </div>
              <div className="form-group">
                <label>Kehadiran</label>
                <select value={form.presence} onChange={(e) => setForm({...form, presence: e.target.value})}>
                  <option value="Hadir">Hadir</option>
                  <option value="Tidak Hadir">Tidak Hadir</option>
                  <option value="Ragu">Ragu-ragu</option>
                </select>
              </div>
              <button type="submit" className="submit-btn">Kirim</button>
            </form>
            {wishes.length > 0 && (
              <div style={{marginTop: '2rem'}}>
                {wishes.map((w, i) => (
                  <div key={i} style={{padding: '1rem', marginBottom: '1rem', background: '#fff', borderRadius: '8px'}}>
                    <strong>{w.name}</strong> ({w.presence})
                    <p style={{marginTop: '0.5rem'}}>{w.message}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="closing-section">
            <h2>Terima Kasih</h2>
            <p className="closing-text">Kehadiran Anda merupakan kebahagiaan bagi kami.</p>
          </section>

          <footer>
            <p>Bayu & Tyara</p>
          </footer>
        </>
      )}
    </main>
  );
}
