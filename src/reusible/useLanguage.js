

import { useTranslation } from "react-i18next";
import cookies from "js-cookie";
import { useEffect } from "react";

const useLanguage = () => {
    const { t, i18n } = useTranslation();
    const lng = cookies.get('i18next') || 'en';

    useEffect(() => {
        window.document.dir = i18n.dir();
    }, [lng]);

    return { t, i18n, lng };
};

export default useLanguage;
