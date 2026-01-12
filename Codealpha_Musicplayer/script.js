// Music Player Application
document.addEventListener('DOMContentLoaded', function() {
  
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const progressBar = document.getElementById('progress-bar');
    const progress = document.getElementById('progress');
    const progressThumb = document.getElementById('progress-thumb');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeIcon = document.getElementById('volume-icon');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const albumArt = document.getElementById('album-art');
    const autoplayToggle = document.getElementById('autoplay-toggle');
    const playlist = document.getElementById('playlist');
    const playlistToggle = document.getElementById('playlist-toggle');
    const closeSidebar = document.getElementById('close-sidebar');
    const playlistSidebar = document.getElementById('playlist-sidebar');
    const themeToggle = document.querySelector('.theme-toggle');
    const playlistCount = document.getElementById('playlist-count');
    
    // Music Playlist Data
    const musicPlaylist = [
        {
            title: "BAROTA",
            artist: "Sidhu Moose Wala",
            src: "./Music/BAROTA (MUSIC VIDEO) SIDHU MOOSE WALA  THE KIDD  LATEST PUNJABI SONGS 2025.mp3",
            duration: "5:18",
            cover: "Images/1.webp"
        },
        {
            title: "BOYFRIEND",
            artist: "KARAN AUJLA, SUNANDA, IKKY",
            src: "./Music/BOYFRIEND(MUSIC VIDEO) KARAN AUJLA SUNANDA  IKKY  Latest Punjabi Songs 2025.mp3",
            duration: "2:41",
            cover: "Images/2.webp"
        },
        {
            title: "HASEEN",
            artist: "TALWIINDER",
            src: "./Music/HASEEN - TALWIINDER, NDS, RIPPY (Official Visualizer).mp3",
            duration: "2:54",
            cover: "Images/3.webp"
        },
        {
            title: " Khayaal",
            artist: "TALWIINDER",
            src: "./Music/@Talwiinder    Khayaal  NDS  Official Music Video  Viral Song.mp3",
            duration: "2:42",
            cover: "Images/3.webp"
        },
        {
            title: "Tumhen Dillagi",
            artist: "Nusrat Fateh Ali Khan",
            src: "./Music/Tumhen Dillagi.mp3",
            duration: "5:55",
            cover: "Images/4.webp"
        },
        {
            title: "Mafia Style ",
            artist: "Sidhu Moose Wala",
            src: "./Music/Mafia Style (Official Song) - Sidhu Moose Wala  Aman Hayer  Latest Punjabi Song 2019.mp3",
            duration: "3:10",
            cover: "Images/1.webp"
        }
    ];
    
   
    let currentSongIndex = 0;
    let isPlaying = false;
    let isShuffled = false;
    let isRepeating = false;
    let originalPlaylist = [...musicPlaylist];
    let shuffledPlaylist = [];
    
   
    function initPlayer() {
        loadSong(currentSongIndex);
        renderPlaylist();
        updatePlaylistCount();
        
        audioPlayer.volume = volumeSlider.value / 100;
        
        // Check for saved theme preference
        if (localStorage.getItem('darkTheme') === 'true') {
            document.body.classList.add('dark-theme');
        }
     
        if (localStorage.getItem('autoplay') === 'true') {
            autoplayToggle.checked = true;
        }
    }
    
    
    function loadSong(index) {
        const song = musicPlaylist[index];
        
        audioPlayer.src = song.src;
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        albumArt.src = song.cover;
        totalTimeEl.textContent = song.duration;
        
       
        updateActiveSong();
    }
    
    
    function renderPlaylist() {
        playlist.innerHTML = '';
        
        musicPlaylist.forEach((song, index) => {
            const li = document.createElement('li');
            li.className = index === currentSongIndex ? 'active' : '';
            li.dataset.index = index;
            
            li.innerHTML = `
                <div class="song-index">${index + 1}</div>
                <div class="song-details">
                    <div class="song-name">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                </div>
                <div class="song-duration">${song.duration}</div>
            `;
            
            li.addEventListener('click', () => playSongFromPlaylist(index));
            playlist.appendChild(li);
        });
    }
    
    
    function updateActiveSong() {
        const playlistItems = document.querySelectorAll('#playlist li');
        playlistItems.forEach((item, index) => {
            if (index === currentSongIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    
    function playSongFromPlaylist(index) {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        playSong();
    }
    
  
    function playSong() {
        isPlaying = true;
        audioPlayer.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        playBtn.title = "Pause";
        
        
        albumArt.style.animation = "rotateAlbumArt 20s linear infinite";
    }
    
    
    function pauseSong() {
        isPlaying = false;
        audioPlayer.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        playBtn.title = "Play";
        
        
        albumArt.style.animation = "none";
    }
    
    
    function togglePlayPause() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }
    
    
    function playNextSong() {
        if (isShuffled) {
            
            const currentSong = musicPlaylist[currentSongIndex];
            const currentIndexInShuffled = shuffledPlaylist.findIndex(song => 
                song.title === currentSong.title && song.artist === currentSong.artist
            );
            
            
            let nextIndexInShuffled = currentIndexInShuffled + 1;
            
            if (nextIndexInShuffled >= shuffledPlaylist.length) {
                nextIndexInShuffled = 0;
            }
            
            
            const nextSong = shuffledPlaylist[nextIndexInShuffled];
            currentSongIndex = musicPlaylist.findIndex(song => 
                song.title === nextSong.title && song.artist === nextSong.artist
            );
        } else {
            currentSongIndex++;
            if (currentSongIndex >= musicPlaylist.length) {
                currentSongIndex = 0;
            }
        }
        
        loadSong(currentSongIndex);
        playSong();
    }
    
    
    function playPrevSong() {
        if (isShuffled) {
            
            const currentSong = musicPlaylist[currentSongIndex];
            const currentIndexInShuffled = shuffledPlaylist.findIndex(song => 
                song.title === currentSong.title && song.artist === currentSong.artist
            );
            
            
            let prevIndexInShuffled = currentIndexInShuffled - 1;
            
            if (prevIndexInShuffled < 0) {
                prevIndexInShuffled = shuffledPlaylist.length - 1;
            }
            
            
            const prevSong = shuffledPlaylist[prevIndexInShuffled];
            currentSongIndex = musicPlaylist.findIndex(song => 
                song.title === prevSong.title && song.artist === prevSong.artist
            );
        } else {
            currentSongIndex--;
            if (currentSongIndex < 0) {
                currentSongIndex = musicPlaylist.length - 1;
            }
        }
        
        loadSong(currentSongIndex);
        playSong();
    }
    

    function toggleShuffle() {
        isShuffled = !isShuffled;
        shuffleBtn.classList.toggle('active', isShuffled);
        
        if (isShuffled) {
           
            shuffledPlaylist = [...musicPlaylist];
            shuffleArray(shuffledPlaylist);
        }
    }
    
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
 
    function toggleRepeat() {
        isRepeating = !isRepeating;
        repeatBtn.classList.toggle('active', isRepeating);
    }
    

    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            progress.style.width = `${progressPercent}%`;
            
           
            progressThumb.style.left = `${progressPercent}%`;
            
            currentTimeEl.textContent = formatTime(currentTime);
        }
    }
    
    
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        
        if (duration) {
            audioPlayer.currentTime = (clickX / width) * duration;
        }
    }
    
    
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    
    function updateVolume() {
        const volume = volumeSlider.value / 100;
        audioPlayer.volume = volume;
        
        
        if (volume === 0) {
            volumeIcon.className = 'fas fa-volume-mute';
        } else if (volume < 0.5) {
            volumeIcon.className = 'fas fa-volume-down';
        } else {
            volumeIcon.className = 'fas fa-volume-up';
        }
    }
    
    
    function toggleAutoplay() {
        localStorage.setItem('autoplay', autoplayToggle.checked);
    }
    
   
    function togglePlaylistSidebar() {
        playlistSidebar.classList.toggle('hidden');
    }
    
    
    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const isDarkTheme = document.body.classList.contains('dark-theme');
        localStorage.setItem('darkTheme', isDarkTheme);
    }
    
    
    function updatePlaylistCount() {
        playlistCount.textContent = musicPlaylist.length;
    }
    
 
    playBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', playPrevSong);
    nextBtn.addEventListener('click', playNextSong);
    shuffleBtn.addEventListener('click', toggleShuffle);
    repeatBtn.addEventListener('click', toggleRepeat);
    
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', () => {
        if (isRepeating) {
            audioPlayer.currentTime = 0;
            audioPlayer.play();
        } else if (autoplayToggle.checked) {
            playNextSong();
        } else {
            pauseSong();
            // Reset progress
            progress.style.width = '0%';
            progressThumb.style.left = '0%';
            currentTimeEl.textContent = '0:00';
        }
    });
    
    audioPlayer.addEventListener('loadedmetadata', () => {
        totalTimeEl.textContent = formatTime(audioPlayer.duration);
    });
    
    progressBar.addEventListener('click', setProgress);
    
    volumeSlider.addEventListener('input', updateVolume);
    
    autoplayToggle.addEventListener('change', toggleAutoplay);
    
    playlistToggle.addEventListener('click', togglePlaylistSidebar);
    
    closeSidebar.addEventListener('click', () => {
        playlistSidebar.classList.add('hidden');
    });
    
    themeToggle.addEventListener('click', toggleTheme);
    
 
    document.addEventListener('keydown', (e) => {
      
        if (e.code === 'Space' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            togglePlayPause();
        }
        
        // Arrow keys for previous/next
        if (e.code === 'ArrowLeft') {
            playPrevSong();
        }
        
        if (e.code === 'ArrowRight') {
            playNextSong();
        }
        
        
        if (e.code === 'KeyM' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            if (audioPlayer.volume > 0) {
                audioPlayer.volume = 0;
                volumeSlider.value = 0;
                updateVolume();
            } else {
                audioPlayer.volume = 0.8;
                volumeSlider.value = 80;
                updateVolume();
            }
        }
    });
    
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rotateAlbumArt {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .ctrl-btn.active {
            background-color: var(--primary-dark);
            box-shadow: 0 0 15px rgba(108, 92, 231, 0.5);
        }
    `;
    document.head.appendChild(style);
    
    // Initialize the player
    initPlayer();
});