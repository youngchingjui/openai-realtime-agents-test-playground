import { useCallback, useEffect, useRef, useState } from "react";

export interface SpeechRecognitionHook {
  isSupported: boolean;
  isListening: boolean;
  transcript: string;
  error: string | null;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

// Minimal Web Speech API wrapper
export default function useSpeechRecognition(onFinal?: (text: string) => void): SpeechRecognitionHook {
  const RecognitionRef = useRef<SpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const AnyWindow = window as any;
    const Rec = AnyWindow.SpeechRecognition || AnyWindow.webkitSpeechRecognition;
    if (!Rec) {
      setIsSupported(false);
      return;
    }
    setIsSupported(true);

    const recognition: SpeechRecognition = new Rec();
    recognition.lang = navigator.language || "en-US";
    recognition.continuous = true; // continuous to accumulate
    recognition.interimResults = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        if (res.isFinal) final += res[0].transcript;
        else interim += res[0].transcript;
      }
      const combined = final ? final : interim;
      setTranscript(combined);

      if (final && onFinal) onFinal(final.trim());
    };

    recognition.onerror = (e: any) => {
      setError(e?.error || "speech_recognition_error");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    RecognitionRef.current = recognition;
    return () => {
      try {
        recognition.stop();
      } catch {}
      RecognitionRef.current = null;
    };
  }, [onFinal]);

  const start = useCallback(() => {
    if (!RecognitionRef.current) return;
    setError(null);
    setTranscript("");
    try {
      RecognitionRef.current.start();
      setIsListening(true);
    } catch {
      // start() may throw if already started
    }
  }, []);

  const stop = useCallback(() => {
    if (!RecognitionRef.current) return;
    try {
      RecognitionRef.current.stop();
      setIsListening(false);
    } catch {}
  }, []);

  const reset = useCallback(() => {
    setTranscript("");
    setError(null);
  }, []);

  return { isSupported, isListening, transcript, error, start, stop, reset };
}

