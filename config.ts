// config.ts

export interface SocialLink {
    name: string;
    link: string;
}

export interface AppConfig {
    basePath: string;
    siteTitle: string;
    languages: string[];
    name: {
        [key: string]: string;
    }
}

export interface ThemeConfig {
    primaryDark: string;
    primaryLight: string;
    secondaryDark: string;
    secondaryLight: string;
}

export interface Config {
    app: AppConfig;
    theme: ThemeConfig;
    socialLinks: SocialLink[];
}

// Example of how you might import JSON data
export const config: Config = {
    app: {
        basePath: "/",
        siteTitle: "Arab Clinic",
        languages: ["ar", "en"],
        name: {
            "ar": "مركز أراب كلينيك",
            "en": "Arab Clinic Center"
        },
    },
    theme: {
        primaryDark: "#6999d5",
        primaryLight: "#6999d5",
        secondaryDark: "#bc161a",
        secondaryLight: "#bc161a"
    },
    socialLinks: [
        {
            name: "facebook",
            link: "https://www.facebook.com/ArabClinicEG?mibextid=LQQJ4d"
        },
        {
            name: "instagram",
            link: "https://www.instagram.com/arabcliniceg?igsh=MWg2MzJsN3JnaDRz&utm_source=qr"
        }
    ]
};

// You can now use the `config` object with full type safety
