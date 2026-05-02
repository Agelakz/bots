'use client'

import { useState, useEffect, useRef } from 'react'

// Wedding Data - Edit di sini ya!
const WEDDING_DATA = {
  groom: {
    name: 'Muhammad Bayu Ramadhan',
    father: 'Bapak Suroso',
    mother: 'Ibu Tri Sayekti',
    image: 'https://i.imgur.com/iK7AC0z/Pngtree-indonesian_wedding_couple_wear_white_6431502_ztq8dh.png' // Ganti foto cowok
  },
  bride: {
    name: 'Mutyara Nurhifa Orvalla Putri',
    father: 'Bapak Henry Irwansson',
    mother: 'Ibu Fitria Andjani',
    image: 'https://i.imgur.com/iK7AC0z/Pngtree-indonesian_wedding_couple_wear_white_6431502_ztq8dh.png' // Ganti foto cewek
  },
  date: '2026-05-14',
  day: 'Kamis',
  music: '', 
  events: [
    {
      title: 'Akad',
      date: 'Kamis, 14 Mei 2026',
      time: '10:15 WITA - Selesai',
      location: 'Jl. DR Sutomo RT 12 No 22, Karang Rejo Balikpapan Tengah'
    }
  ]
}

export default function Home() {
  const [showMain, setShowMain] = useState(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isPlaying, setIsPlaying] = useState(false)
  const [wishes, setWishes] = useState({ name: '', attendance: 'Hadir', message: '' })
  const audioRef = useRef(null)

  useEffect(() => {
    const targetDate = new Date(WEDDING_DATA.date).getTime()
    
    const updateCountdown = () => {
      const now = new Date().getTime()
      const diff = targetDate - now
      
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        })
      }
    }
    
    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleOpen = () => {
    setShowMain(true)
    document.getElementById('main')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmitWishes = (e) => {
    e.preventDefault()
    alert(`Terima kasih ${wishes.name}! Doa Anda telah terkirim.`)
    setWishes({ name: '', attendance: 'Hadir', message: '' })
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <>
      {/* Cover Section */}
      <section className="cover">
        <div className="cover-content">
          <p className="invitation-title">UNDANGAN PERNIKAHAN</p>
          <h1>{WEDDING_DATA.groom.name.split(' ').slice(-2).join(' ')}</h1>
          <span className="ampersand">&</span>
          <h1 className="names">{WEDDING_DATA.bride.name.split(' ').slice(-2).join(' ')}</h1>
          <p className="guest-message">Kepada Yth Bapak/Ibu/Saudara/i</p>
          <button className="open-btn" onClick={handleOpen}>
            Buka Undangan
          </button>
          {WEDDING_DATA.music && (
            <button 
              className="music-btn" 
              onClick={toggleMusic}
              style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'var(--accent)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100,
                fontSize: '1.2rem'
              }}
            >
              {isPlaying ? '🔊' : '🔇'}
            </button>
          )}
        </div>
      </section>

      {/* Main Content */}
      {showMain && (
        <main id="main" className="main-content">
          {/* Countdown Section */}
          <section className="countdown-section">
            <p className="countdown-title">INSYA ALLAH</p>
            <h2 className="countdown-date">{WEDDING_DATA.day}, {WEDDING_DATA.date.split('-').reverse().join(' ')}</h2>
            <div className="countdown">
              <div className="countdown-item">
                <span className="countdown-number">{countdown.days}</span>
                <span className="countdown-label">Hari</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">{countdown.hours}</span>
                <span className="countdown-label">Jam</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">{countdown.minutes}</span>
                <span className="countdown-label">Menit</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">{countdown.seconds}</span>
                <span className="countdown-label">Detik</span>
              </div>
            </div>
          </section>

          {/* Salam Section */}
          <section className="salam-section">
            <div className="container">
              <h2>Assalamu'alaikum wr. wb.</h2>
              <p className="salam-text">
                Tanpa mengurangi rasa hormat. Kami mengundang anda pada acara pernikahan kami.
              </p>
            </div>
          </section>

          {/* Couple Section */}
          <section className="couple-section">
            <div className="container">
              <div className="couple-card">
                <img src={WEDDING_DATA.groom.image} alt={WEDDING_DATA.groom.name} className="couple-image" />
                <h3 className="couple-name">{WEDDING_DATA.groom.name}</h3>
                <p className="couple-parents">Putra dari {WEDDING_DATA.groom.father} & {WEDDING_DATA.groom.mother}</p>
              </div>
              <span className="ampersand">&</span>
              <div className="couple-card">
                <img src={WEDDING_DATA.bride.image} alt={WEDDING_DATA.bride.name} className="couple-image" />
                <h3 className="couple-name">{WEDDING_DATA.bride.name}</h3>
                <p className="couple-parents">Putri dari {WEDDING_DATA.bride.father} & {WEDDING_DATA.bride.mother}</p>
              </div>
            </div>
          </section>

          {/* Event Section */}
          <section className="event-section">
            <div className="container">
              <h2 className="section-title">Rangkaian Acara</h2>
              <div className="event-cards">
                {WEDDING_DATA.events.map((event, index) => (
                  <div key={index} className="event-card">
                    <h3>{event.title}</h3>
                    <p className="date">{event.date}</p>
                    <p className="time">{event.time}</p>
                    <p className="location">{event.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Wishes Section */}
          <section className="wishes-section">
            <div className="container">
              <h2 className="section-title" style={{ color: '#fff' }}>Ucapan & Doa</h2>
              <form className="wishes-form" onSubmit={handleSubmitWishes}>
                <div className="form-group">
                  <label>Nama *</label>
                  <input 
                    type="text" 
                    value={wishes.name}
                    onChange={(e) => setWishes({ ...wishes, name: e.target.value })}
                    placeholder="Masukkan nama Anda"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Konfirmasi Kehadiran *</label>
                  <select 
                    value={wishes.attendance}
                    onChange={(e) => setWishes({ ...wishes, attendance: e.target.value })}
                  >
                    <option value="Hadir">Hadir</option>
                    <option value="Belum Pasti">Belum Pasti</option>
                    <option value="Tidak Hadir">Tidak Hadir</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Pesan / Doa *</label>
                  <textarea 
                    value={wishes.message}
                    onChange={(e) => setWishes({ ...wishes, message: e.target.value })}
                    placeholder="Pesan atau doa yang ingin kamu sampaikan kepada mempelai."
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">Kirim</button>
              </form>
            </div>
          </section>

          {/* Closing Section */}
          <section className="closing-section">
            <div className="container">
              <h2>{WEDDING_DATA.groom.name.split(' ').slice(-2).join(' ')} & {WEDDING_DATA.bride.name.split(' ').slice(-2).join(' ')}</h2>
              <p className="closing-text">
                Atas kehadiran dan do'a restu dari anda semua. Kami ucapkan terima kasih yang sebesar - besarnya.
              </p>
              <h2 style={{ marginTop: '2rem', fontSize: '2rem' }}>Wassalamu'alaikum wr. wb.</h2>
            </div>
          </section>
        </main>
      )}

      <footer>
        <p>made with ❤️</p>
      </footer>
      {WEDDING_DATA.music && (
        <audio ref={audioRef} src={WEDDING_DATA.music} loop />
      )}
    </>
  )
}