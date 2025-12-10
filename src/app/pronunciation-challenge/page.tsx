'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Loader,
  Mic,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import { getSpeechAudio } from './actions';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

// Dictionary for all UI texts
const lang: Record<string, Record<string, string>> = {
  ar: {
    title: 'تحدي النطق الملكي',
    mentor: 'تحدي تلميذ النيل - الجملة الافتتاحية',
    instructions: 'استمع إلى الجملة ورددها بصوت واضح.',
    loading: 'جارٍ تجهيز صوت المرشد...',
    error: 'حدث خطأ: لا يمكن تشغيل الصوت.',
    record: 'سجل صوتك',
    next: 'التالي',
    go_back: 'العودة للوحة التحكم',
    play_audio: 'استمع للجملة',
    playing_audio: 'جاري التشغيل...',
    your_turn: 'حان دورك الآن!',
    record_prompt: 'يمكنك تسجيل صوتك للممارسة.',
    next_prompt: 'رائع! سيتم نقلك للتحدي التالي.',
    audio_ready: 'الصوت جاهز',
    audio_ready_desc: 'يمكنك الآن الاستماع إلى الجملة.',
    audio_error_title: 'خطأ في الصوت',
    audio_error_desc: 'فشل في جلب المقطع الصوتي.',
    playback_error_title: 'خطأ في التشغيل',
    playback_error_desc: 'لم نتمكن من تشغيل الملف الصوتي.',
  },
  en: {
    title: 'The Royal Pronunciation Challenge',
    mentor: 'Disciple of the Nile Challenge - Opening Phrase',
    instructions: 'Listen to the sentence and repeat it clearly.',
    loading: "Preparing mentor's voice...",
    error: 'An error occurred: Cannot play audio.',
    record: 'Record Your Voice',
    next: 'Next',
    go_back: 'Back to Dashboard',
    play_audio: 'Listen to Sentence',
    playing_audio: 'Playing...',
    your_turn: "It's your turn now!",
    record_prompt: 'You can record your voice to practice.',
    next_prompt: 'Great! You will be taken to the next challenge.',
    audio_ready: 'Audio Ready',
    audio_ready_desc: 'You can now listen to the sentence.',
    audio_error_title: 'Audio Error',
    audio_error_desc: 'Failed to fetch the audio clip.',
    playback_error_title: 'Playback Error',
    playback_error_desc: 'We could not play the audio file.',
  },
    fr: {
        title: "Défi de Prononciation Royal",
        mentor: "Défi du Disciple du Nil - Phrase d'Ouverture",
        instructions: "Écoutez la phrase et répétez-la clairement.",
        loading: "Préparation de la voix du mentor...",
        error: "Une erreur s'est produite: lecture audio impossible.",
        record: "Enregistrer votre voix",
        next: "Suivant",
        go_back: "Retour au tableau de bord",
        play_audio: "Écouter la phrase",
        playing_audio: "Lecture en cours...",
        your_turn: "C'est à votre tour!",
        record_prompt: "Vous pouvez enregistrer votre voix pour vous entraîner.",
        next_prompt: "Super! Vous serez redirigé vers le prochain défi.",
        audio_ready: "Audio prêt",
        audio_ready_desc: "Vous pouvez maintenant écouter la phrase.",
        audio_error_title: "Erreur Audio",
        audio_error_desc: "Échec de la récupération du clip audio.",
        playback_error_title: "Erreur de lecture",
        playback_error_desc: "Nous n'avons pas pu lire le fichier audio.",
    },
    es: {
        title: "Desafío de Pronunciación Real",
        mentor: "Desafío del Discípulo del Nilo - Frase Inicial",
        instructions: "Escuche la frase y repítala claramente.",
        loading: "Preparando la voz del mentor...",
        error: "Ocurrió un error: No se puede reproducir el audio.",
        record: "Grabe su voz",
        next: "Siguiente",
        go_back: "Volver al Panel",
        play_audio: "Escuchar la frase",
        playing_audio: "Reproduciendo...",
        your_turn: "¡Ahora es tu turno!",
        record_prompt: "Puedes grabar tu voz para practicar.",
        next_prompt: "¡Genial! Serás llevado al siguiente desafío.",
        audio_ready: "Audio listo",
        audio_ready_desc: "Ahora puedes escuchar la frase.",
        audio_error_title: "Error de audio",
        audio_error_desc: "No se pudo obtener el clip de audio.",
        playback_error_title: "Error de reproducción",
        playback_error_desc: "No pudimos reproducir el archivo de audio.",
    },
     zh: {
        title: "皇家发音挑战",
        mentor: "尼罗河弟子挑战 - 开场白",
        instructions: "听句子并清晰地重复。",
        loading: "正在准备导师的声音...",
        error: "发生错误：无法播放音频。",
        record: "录制您的声音",
        next: "下一步",
        go_back: "返回仪表板",
        play_audio: "听句子",
        playing_audio: "播放中...",
        your_turn: "现在轮到你了！",
        record_prompt: "您可以录制自己的声音进行练习。",
        next_prompt: "太好了！您将被带到下一个挑战。",
        audio_ready: "音频准备就绪",
        audio_ready_desc: "您现在可以听句子了。",
        audio_error_title: "音频错误",
        audio_error_desc: "无法获取音频剪辑。",
        playback_error_title: "播放错误",
        playback_error_desc: "我们无法播放音频文件。",
    },
    it: {
        title: "Sfida di Pronuncia Reale",
        mentor: "Sfida del Discepolo del Nilo - Frase d'Apertura",
        instructions: "Ascolta la frase e ripetila chiaramente.",
        loading: "Preparando la voce del mentore...",
        error: "Si è verificato un errore: impossibile riprodurre l'audio.",
        record: "Registra la tua voce",
        next: "Avanti",
        go_back: "Torna alla Dashboard",
        play_audio: "Ascolta la frase",
        playing_audio: "In riproduzione...",
        your_turn: "Ora tocca a te!",
        record_prompt: "Puoi registrare la tua voce per esercitarti.",
        next_prompt: "Ottimo! Sarai portato alla prossima sfida.",
        audio_ready: "Audio pronto",
        audio_ready_desc: "Ora puoi ascoltare la frase.",
        audio_error_title: "Errore audio",
        audio_error_desc: "Impossibile recuperare la clip audio.",
        playback_error_title: "Errore di riproduzione",
        playback_error_desc: "Non è stato possibile riprodurre il file audio.",
    },
    nl: {
        title: "Koninklijke Uitspraakuitdaging",
        mentor: "Leerling van de Nijl Uitdaging - Openingszin",
        instructions: "Luister naar de zin en herhaal deze duidelijk.",
        loading: "Bezig met het voorbereiden van de stem van de mentor...",
        error: "Er is een fout opgetreden: kan audio niet afspelen.",
        record: "Neem uw stem op",
        next: "Volgende",
        go_back: "Terug naar Dashboard",
        play_audio: "Luister naar de zin",
        playing_audio: "Aan het afspelen...",
        your_turn: "Nu is het jouw beurt!",
        record_prompt: "U kunt uw stem opnemen om te oefenen.",
        next_prompt: "Geweldig! U wordt naar de volgende uitdaging geleid.",
        audio_ready: "Audio gereed",
        audio_ready_desc: "U kunt nu naar de zin luisteren.",
        audio_error_title: "Audiofout",
        audio_error_desc: "Kan de audioclip niet ophalen.",
        playback_error_title: "Afspeelfout",
        playback_error_desc: "We konden het audiobestand niet afspelen.",
    },
    de: {
        title: "Königliche Aussprache-Herausforderung",
        mentor: "Schüler des Nils Herausforderung - Eröffnungssatz",
        instructions: "Hören Sie sich den Satz an und wiederholen Sie ihn deutlich.",
        loading: "Stimme des Mentors wird vorbereitet...",
        error: "Ein Fehler ist aufgetreten: Audio kann nicht abgespielt werden.",
        record: "Nimm deine Stimme auf",
        next: "Weiter",
        go_back: "Zurück zum Dashboard",
        play_audio: "Satz anhören",
        playing_audio: "Wird abgespielt...",
        your_turn: "Jetzt sind Sie dran!",
        record_prompt: "Sie können Ihre Stimme zum Üben aufnehmen.",
        next_prompt: "Großartig! Sie werden zur nächsten Herausforderung weitergeleitet.",
        audio_ready: "Audio bereit",
        audio_ready_desc: "Sie können den Satz jetzt anhören.",
        audio_error_title: "Audio-Fehler",
        audio_error_desc: "Audio-Clip konnte nicht abgerufen werden.",
        playback_error_title: "Wiedergabefehler",
        playback_error_desc: "Wir konnten die Audiodatei nicht abspielen.",
    }
};

export default function PronunciationChallengePage() {
  const [currentLang, setCurrentLang] = useState('ar');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isChallengeCompleted, setIsChallengeCompleted] = useState(false);

  const { toast } = useToast();
  const challengePhrase = 'صباح الخير، أنا كويس، متشكر.';
  const texts = lang[currentLang] || lang.ar;
  const isRtl = currentLang === 'ar';

  const fetchAudio = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setAudioUrl(null);

    const result = await getSpeechAudio({ text: challengePhrase });

    if (result.success) {
      setAudioUrl(result.success);
      toast({
        title: `✅ ${texts.audio_ready}`,
        description: texts.audio_ready_desc,
      });
    } else {
      setError(result.error || texts.error);
      toast({
        variant: 'destructive',
        title: `❌ ${texts.audio_error_title}`,
        description: result.error || texts.audio_error_desc,
      });
    }
    setIsLoading(false);
  }, [challengePhrase, texts, toast]);

  useEffect(() => {
    fetchAudio();
  }, [fetchAudio]);

  const handlePlayAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      setIsPlaying(true);
      audio.play();
      audio.onended = () => {
        setIsPlaying(false);
        setIsChallengeCompleted(true); 
        toast({
            title: `✅ ${texts.your_turn}`,
            description: texts.record_prompt,
        });
      };
      audio.onerror = () => {
        setIsPlaying(false);
        setError(texts.error);
        toast({
          variant: 'destructive',
          title: `❌ ${texts.playback_error_title}`,
          description: texts.playback_error_desc,
        });
      }
    }
  };

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    if(document.documentElement) {
        document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = langCode;
    }
  };

   useEffect(() => {
    handleLanguageChange(currentLang);
   }, [currentLang]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-nile-dark p-4">
       <div className="fixed top-4 left-4 z-10 flex items-center gap-4">
        <Select onValueChange={handleLanguageChange} defaultValue={currentLang}>
          <SelectTrigger className="w-[180px] bg-gold-accent text-dark-granite border-none royal-title font-bold shadow-lg">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ar">العربية (AR)</SelectItem>
            <SelectItem value="en">English (EN)</SelectItem>
            <SelectItem value="fr">Français (FR)</SelectItem>
            <SelectItem value="es">Español (ES)</SelectItem>
            <SelectItem value="zh">中文 (ZH)</SelectItem>
            <SelectItem value="it">Italiano (IT)</SelectItem>
            <SelectItem value="nl">Nederlands (NL)</SelectItem>
            <SelectItem value="de">Deutsch (DE)</SelectItem>
          </SelectContent>
        </Select>
         <Link href="/" className="utility-button px-4 py-2 text-md font-bold rounded-lg flex items-center justify-center">
            <i className={`fas fa-arrow-left ${isRtl ? 'ml-2' : 'mr-2'}`}></i>
            <span>{texts.go_back}</span>
        </Link>
      </div>

      <div className="w-full max-w-2xl p-6 bg-white rounded-2xl shadow-2xl dashboard-card text-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-dark-granite mb-2">
            <span className="royal-title text-gold-accent">{texts.title}</span>
          </h1>
          <p className="text-lg text-sand-ochre">{texts.mentor}</p>
        </div>

        <div className="bg-nile p-8 md:p-12 rounded-xl shadow-inner border-2 border-sand-ochre/20 text-center">
          <div className="mb-8 p-4 bg-nile-dark rounded-lg border-2 border-dashed border-sand-ochre">
            <p className="text-4xl font-extrabold text-white royal-title">
              {challengePhrase}
            </p>
          </div>

          <p className="text-xl mb-8 text-sand-ochre font-bold">
            {texts.instructions}
          </p>

          <Button
            id="play-button"
            onClick={handlePlayAudio}
            disabled={isLoading || !audioUrl || isPlaying}
            className="shadow-lg mb-8 w-24 h-24 rounded-full bg-gold-accent text-nile-dark text-3xl mx-auto flex items-center justify-center hover:bg-yellow-300 transition-all duration-300 disabled:bg-gray-400 transform hover:scale-110"
          >
            {isLoading ? (
              <Loader className="animate-spin" />
            ) : isPlaying ? (
                <i className="fas fa-pause"></i>
            ) : (
                <i className="fas fa-volume-up"></i>
            )}
          </Button>

          {isLoading && (
               <p className="text-sm text-sand-ochre flex items-center justify-center gap-2">
                 <Loader className="animate-spin" size={16} /> {texts.loading}
               </p>
          )}

          {error && (
            <p className="text-sm text-red-500 flex items-center justify-center gap-2">
              <AlertTriangle size={16} /> {error}
            </p>
          )}

          <div className={`mt-10 flex ${isRtl ? 'justify-between' : 'justify-between flex-row-reverse'}`}>
            <Button
              disabled={!isChallengeCompleted} 
              className="cta-button px-6 py-3 text-lg rounded-full flex items-center"
            >
              <Mic className={isRtl ? 'ml-2' : 'mr-2'} />
              <span>{texts.record}</span>
            </Button>
            <Button
              disabled={!isChallengeCompleted}
              className="cta-button px-6 py-3 text-lg rounded-full flex items-center"
              onClick={() => {
                toast({ title: 'رائع!', description: texts.next_prompt });
              }}
            >
              <span>{texts.next}</span>
              {isRtl ? <ChevronLeft className="mr-2" /> : <ChevronRight className="ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
