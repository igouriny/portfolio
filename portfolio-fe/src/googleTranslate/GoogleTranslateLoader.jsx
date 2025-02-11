import { useEffect, useState } from "react";

export default function GoogleTranslateDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Load the Google Translate script if not already present
    if (
      !document.querySelector(
        'script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]'
      )
    ) {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    // Define the global initialization function (only once)
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = function () {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",        // Default page language
            autoDisplay: false,        // Prevents the default widget UI from displaying
            includedLanguages: "en,fr",// Only allow English and French
          },
          "google_translate_element"   // ID of the container for the widget (hidden)
        );
      };
    }

    // Inject custom CSS to hide the default Google Translate UI and branding
    const style = document.createElement("style");
    style.innerHTML = `
      /* Hide the default widget container */
      #google_translate_element {
        display: none;
      }
      /* Hide the top banner and skiptranslate container */
      .goog-te-banner-frame,
      iframe.goog-te-banner-frame,
      body > .skiptranslate {
        display: none !important;
      }
      body {
        top: 0 !important;
      }
      /* Hide the default gadget and Google branding */
      .goog-te-gadget,
      .goog-logo-link {
        display: none !important;
      }
      /* Hide translation feedback popups/tooltips */
      .goog-te-balloon-frame,
      .goog-tooltip,
      .goog-tooltip-simple {
        display: none !important;
      }
      /* Styling for the language button */
      .language-button {
        border: none;
        background: none;
        cursor: pointer;
        font-size: 14px;
        color: #85878b;
        padding: 15px 25px;
        outline: none;
      }
      /* Styling for the dropdown menu */
      .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1000;
        background-color: #26292e;
        border: 1px solid #ccc;
        box-shadow: 0px 2px 5px rgba(0,0,0,0.2);
      }
      .dropdown-item {
        padding: 15px 25px;
        font-size: 14px;
        cursor: pointer;
        background: white;
        color: #26292e;
        transition: none;
      }
      .dropdown-item:hover {
        background: #0D6EFD;
        color: white;
      }
    `;
    document.head.appendChild(style);

    // (Optional cleanup on unmount)
    return () => {
      // Cleanup code here if necessary
    };
  }, []);

  // Function to change language using the hidden widget's <select>
  const changeLanguage = (lang) => {
    const combo = document.querySelector(".goog-te-combo");
    if (combo) {
      combo.value = lang;
      const event = document.createEvent("HTMLEvents");
      event.initEvent("change", true, true);
      combo.dispatchEvent(event);
    } else {
      console.warn("Google Translate widget not loaded yet.");
    }
    setIsDropdownOpen(false);
  };

  // Toggle the dropdown menu when the button is clicked
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Hidden container for the Google Translate widget */}
      <div id="google_translate_element"></div>
      {/* Language button with a caret that toggles based on dropdown state */}
      <button className="language-button" onClick={toggleDropdown}>
        LANGUAGE {isDropdownOpen ? "∧" : "∨"}
      </button>
      {/* Conditionally render the dropdown menu */}
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-item" onClick={() => changeLanguage("en")}>
            English
          </div>
          <div className="dropdown-item" onClick={() => changeLanguage("fr")}>
            Français
          </div>
        </div>
      )}
    </div>
  );
}
