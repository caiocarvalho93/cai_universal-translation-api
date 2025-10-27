import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

const UniversalLanguageButton = () => {
  try {
    const { currentLanguage, changeLanguage, availableLanguages } =
      useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    // Flag emojis mapping - restored exactly as before
    const getLanguageDisplay = (code) => {
      const flagEmojis = {
        en: "\uD83C\uDDFA\uD83C\uDDF8", // 🇺🇸
        es: "\uD83C\uDDEA\uD83C\uDDF8", // 🇪🇸
        fr: "\uD83C\uDDEB\uD83C\uDDF7", // 🇫🇷
        de: "\uD83C\uDDE9\uD83C\uDDEA", // 🇩🇪
        it: "\uD83C\uDDEE\uD83C\uDDF9", // 🇮🇹
        pt: "\uD83C\uDDF5\uD83C\uDDF9", // 🇵🇹
        br: "\uD83C\uDDE7\uD83C\uDDF7", // 🇧🇷
        ru: "\uD83C\uDDF7\uD83C\uDDFA", // 🇷🇺
        ja: "\uD83C\uDDEF\uD83C\uDDF5", // 🇯🇵
        ko: "\uD83C\uDDF0\uD83C\uDDF7", // 🇰🇷
        zh: "\uD83C\uDDE8\uD83C\uDDF3", // 🇨🇳
        ar: "\uD83C\uDDF8\uD83C\uDDE6", // 🇸🇦
        hi: "\uD83C\uDDEE\uD83C\uDDF3", // 🇮🇳
        tr: "\uD83C\uDDF9\uD83C\uDDF7", // 🇹🇷
        pl: "\uD83C\uDDF5\uD83C\uDDF1", // 🇵🇱
        nl: "\uD83C\uDDF3\uD83C\uDDF1", // 🇳🇱
        sv: "\uD83C\uDDF8\uD83C\uDDEA", // 🇸🇪
        da: "\uD83C\uDDE9\uD83C\uDDF0", // 🇩🇰
        no: "\uD83C\uDDF3\uD83C\uDDF4", // 🇳🇴
        fi: "\uD83C\uDDEB\uD83C\uDDEE", // 🇫🇮
        cs: "\uD83C\uDDE8\uD83C\uDDFF", // 🇨🇿
        hu: "\uD83C\uDDED\uD83C\uDDFA", // 🇭🇺
        ro: "\uD83C\uDDF7\uD83C\uDDF4", // 🇷🇴
        bg: "\uD83C\uDDE7\uD83C\uDDEC", // 🇧🇬
        hr: "\uD83C\uDDED\uD83C\uDDF7", // 🇭🇷
        sk: "\uD83C\uDDF8\uD83C\uDDF0", // 🇸🇰
        sl: "\uD83C\uDDF8\uD83C\uDDEE", // 🇸🇮
        et: "\uD83C\uDDEA\uD83C\uDDEA", // 🇪🇪
        lv: "\uD83C\uDDF1\uD83C\uDDFB", // 🇱🇻
        lt: "\uD83C\uDDF1\uD83C\uDDF9", // 🇱🇹
        mt: "\uD83C\uDDF2\uD83C\uDDF9", // 🇲🇹
        el: "\uD83C\uDDEC\uD83C\uDDF7", // 🇬🇷
        cy: "\uD83C\uDDE8\uD83C\uDDFE", // 🇨🇾
        ga: "\uD83C\uDDEE\uD83C\uDDEA", // 🇮🇪
        eu: "\uD83C\uDDEA\uD83C\uDDF8", // 🇪🇸 (Basque uses Spain flag)
        ca: "\uD83C\uDDEA\uD83C\uDDF8", // 🇪🇸 (Catalan uses Spain flag)
        gl: "\uD83C\uDDEA\uD83C\uDDF8", // 🇪🇸 (Galician uses Spain flag)
        th: "\uD83C\uDDF9\uD83C\uDDED", // 🇹🇭
        vi: "\uD83C\uDDFB\uD83C\uDDF3", // 🇻🇳
        id: "\uD83C\uDDEE\uD83C\uDDE9", // 🇮🇩
        ms: "\uD83C\uDDF2\uD83C\uDDFE", // 🇲🇾
        tl: "\uD83C\uDDF5\uD83C\uDDED", // 🇵🇭
        he: "\uD83C\uDDEE\uD83C\uDDF1", // 🇮🇱
        fa: "\uD83C\uDDEE\uD83C\uDDF7", // 🇮🇷
        ur: "\uD83C\uDDF5\uD83C\uDDF0", // 🇵🇰
        bn: "\uD83C\uDDE7\uD83C\uDDE9", // 🇧🇩
        ta: "\uD83C\uDDF1\uD83C\uDDF0", // 🇱🇰
        te: "\uD83C\uDDEE\uD83C\uDDF3", // 🇮🇳
        mr: "\uD83C\uDDEE\uD83C\uDDF3", // 🇮🇳
        gu: "\uD83C\uDDEE\uD83C\uDDF3", // 🇮🇳
        kn: "\uD83C\uDDEE\uD83C\uDDF3", // 🇮🇳
        ml: "\uD83C\uDDEE\uD83C\uDDF3", // 🇮🇳
        pa: "\uD83C\uDDEE\uD83C\uDDF3", // 🇮🇳
        ne: "\uD83C\uDDF3\uD83C\uDDF5", // 🇳🇵
        si: "\uD83C\uDDF1\uD83C\uDDF0", // 🇱🇰
        my: "\uD83C\uDDF2\uD83C\uDDF2", // 🇲🇲
        km: "\uD83C\uDDF0\uD83C\uDDED", // 🇰🇭
        lo: "\uD83C\uDDF1\uD83C\uDDE6", // 🇱🇦
        ka: "\uD83C\uDDEC\uD83C\uDDEA", // 🇬🇪
        hy: "\uD83C\uDDE6\uD83C\uDDF2", // 🇦🇲
        az: "\uD83C\uDDE6\uD83C\uDDFF", // 🇦🇿
        kk: "\uD83C\uDDF0\uD83C\uDDFF", // 🇰🇿
        ky: "\uD83C\uDDF0\uD83C\uDDEC", // 🇰🇬
        uz: "\uD83C\uDDFA\uD83C\uDDFF", // 🇺🇿
        mn: "\uD83C\uDDF2\uD83C\uDDF3", // 🇲🇳
        am: "\uD83C\uDDEA\uD83C\uDDF9", // 🇪🇹
        sw: "\uD83C\uDDF0\uD83C\uDDEA", // 🇰🇪
        zu: "\uD83C\uDDFF\uD83C\uDDE6", // 🇿🇦
        af: "\uD83C\uDDFF\uD83C\uDDE6", // 🇿🇦
        xh: "\uD83C\uDDFF\uD83C\uDDE6", // 🇿🇦
        yo: "\uD83C\uDDF3\uD83C\uDDEC", // 🇳🇬
        ig: "\uD83C\uDDF3\uD83C\uDDEC", // 🇳🇬
        ha: "\uD83C\uDDF3\uD83C\uDDEC", // 🇳🇬
        so: "\uD83C\uDDF8\uD83C\uDDF4", // 🇸🇴
        rw: "\uD83C\uDDF7\uD83C\uDDFC", // 🇷🇼
        lg: "\uD83C\uDDFA\uD83C\uDDEC", // 🇺🇬
        sn: "\uD83C\uDDFF\uD83C\uDDFC", // 🇿🇼
        ny: "\uD83C\uDDF2\uD83C\uDDFC", // 🇲🇼
        mg: "\uD83C\uDDF2\uD83C\uDDEC", // 🇲🇬
        "es-AR": "\uD83C\uDDE6\uD83C\uDDF7", // 🇦🇷
        "es-CL": "\uD83C\uDDE8\uD83C\uDDF1", // 🇨🇱
        "es-UY": "\uD83C\uDDFA\uD83C\uDDFE", // 🇺🇾
        "es-MX": "\uD83C\uDDF2\uD83C\uDDFD", // 🇲🇽
        "es-CO": "\uD83C\uDDE8\uD83C\uDDF4", // 🇨🇴
      };
      return flagEmojis[code] || "\uD83C\uDF0D"; // 🌍
    };

    const getLanguageName = (code) => {
      const names = {
        en: "English",
        es: "Español",
        fr: "Français",
        de: "Deutsch",
        it: "Italiano",
        pt: "Português",
        br: "Português (Brasil)",
        ru: "Русский",
        ja: "日本語",
        ko: "한국어",
        zh: "中文",
        ar: "العربية",
        hi: "हिन्दी",
        tr: "Türkçe",
        pl: "Polski",
        nl: "Nederlands",
      };
      return names[code] || code;
    };

    // Debug language changes and force flag update
    useEffect(() => {
      console.log("🌍 Language changed to:", currentLanguage);
      console.log("🌍 Flag should show:", getLanguageDisplay(currentLanguage));
      // Force component re-render by updating a local state
      setIsOpen(false); // Close dropdown and refresh display
    }, [currentLanguage]);

    // Debug what we're getting from useLanguage
    console.log("🔍 UniversalLanguageButton Debug:", {
      currentLanguage,
      changeLanguage: typeof changeLanguage,
      availableLanguages: availableLanguages?.length,
      hasContext: !!(currentLanguage && changeLanguage && availableLanguages),
    });

    // Safety check
    if (!currentLanguage || !changeLanguage || !availableLanguages) {
      console.warn("⚠️ UniversalLanguageButton: Missing context values", {
        currentLanguage,
        changeLanguage: !!changeLanguage,
        availableLanguages: !!availableLanguages,
      });

      return (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(255, 20, 147, 0.2)",
            border: "2px solid rgba(255, 20, 147, 0.5)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            textAlign: "center",
            zIndex: 1000,
          }}
        >
          LOAD
        </div>
      );
    }

    return (
      <div style={{ position: "relative", zIndex: 1000 }}>
        {/* Main Button */}
        <motion.button
          key={`flag-button-${currentLanguage}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(255, 20, 147, 0.2), rgba(255, 105, 180, 0.3))",
            backdropFilter: "blur(15px)",
            border: "2px solid rgba(255, 20, 147, 0.5)",
            color: "white",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            fontWeight: "bold",
            textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
            boxShadow: "0 0 20px rgba(255, 20, 147, 0.4)",
          }}
        >
          <div style={{ fontSize: "20px", marginBottom: "2px" }}>
            {getLanguageDisplay(currentLanguage)}
          </div>
          <div
            style={{
              fontSize: "8px",
              fontWeight: "900",
              letterSpacing: "0.5px",
            }}
          >
            {currentLanguage.toUpperCase()}
          </div>
        </motion.button>

        {/* Language Dropdown */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0, 0, 0, 0.3)",
                backdropFilter: "blur(2px)",
                zIndex: 999,
              }}
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              style={{
                position: "fixed",
                top: "110px",
                right: "20px",
                width: "320px",
                maxHeight: "70vh",
                background:
                  "linear-gradient(135deg, rgba(255, 20, 147, 0.15), rgba(255, 105, 180, 0.1))",
                backdropFilter: "blur(20px)",
                border: "2px solid rgba(255, 20, 147, 0.3)",
                borderRadius: "20px",
                padding: "20px",
                boxShadow: "0 20px 60px rgba(255, 20, 147, 0.4)",
                overflowY: "auto",
                zIndex: 1001,
              }}
            >
              {/* Header */}
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "20px",
                  color: "white",
                  textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
                }}
              >
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
                  UNIVERSAL TRANSLATOR
                </h3>
                <p
                  style={{
                    margin: "5px 0 0 0",
                    fontSize: "12px",
                    opacity: 0.8,
                  }}
                >
                  AI-Powered Global Language System
                </p>
              </div>

              {/* Language Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "10px",
                }}
              >
                {availableLanguages.slice(0, 20).map((lang) => (
                  <motion.button
                    key={lang}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(255, 20, 147, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      console.log("🌍 Selecting language:", lang, "- Flag:", getLanguageDisplay(lang), "- Name:", getLanguageName(lang));
                      changeLanguage(lang);
                      setIsOpen(false);
                    }}
                    style={{
                      background:
                        currentLanguage === lang
                          ? "rgba(255, 20, 147, 0.4)"
                          : "rgba(255, 255, 255, 0.1)",
                      border:
                        currentLanguage === lang
                          ? "2px solid rgba(255, 20, 147, 0.8)"
                          : "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "12px",
                      padding: "12px 8px",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "600",
                      textAlign: "center",
                      transition: "all 0.2s ease",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>
                      {getLanguageDisplay(lang)}
                    </span>
                    <span>{getLanguageName(lang)}</span>
                    <span style={{ fontSize: "8px", opacity: 0.6 }}>
                      {lang.toUpperCase()}
                    </span>
                    {currentLanguage === lang && (
                      <span style={{ fontSize: "10px", opacity: 0.8 }}>
                        ✓ ACTIVE
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Footer */}
              <div
                style={{
                  textAlign: "center",
                  marginTop: "15px",
                  padding: "10px",
                  background: "rgba(255, 20, 147, 0.1)",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "10px",
                  opacity: 0.8,
                }}
              >
                Powered by AI Intelligence Network
              </div>
            </motion.div>
          </>
        )}
      </div>
    );
  } catch (error) {
    console.error("UniversalLanguageButton error:", error);
    return (
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "rgba(255, 20, 147, 0.2)",
          border: "2px solid rgba(255, 20, 147, 0.5)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          textAlign: "center",
          zIndex: 1000,
        }}
      >
        ERROR
      </div>
    );
  }
};

export default UniversalLanguageButton;