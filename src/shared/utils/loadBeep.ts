import GravitationalBeep from '../../assets/audios/gravitational_beep.mp3';

export function loadBeep() {
  const audio = new Audio(GravitationalBeep);
  audio.load();

  return () => {
    audio.currentTime = 0;
    audio.play().catch(error => console.log('Erro ao carregar audio', error));
  };
}
