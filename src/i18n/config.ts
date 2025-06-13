import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        listPractice: 'List your practice',
        employers: 'For Employers',
        courses: 'Courses',
        books: 'Books',
        speakers: 'Speakers',
        doctors: 'Doctors',
      },
      auth: {
        loginSignup: 'Login / Signup',
        doctor: 'Doctor',
        patient: 'Patient',
      },
      hero: {
        title: {
          part1: 'Book an appointment with',
          highlight: 'lifestyle medicine',
          part2: 'experts',
        },
        subtitle: 'Optimize your lifestyle and reverse chronic diseases.',
      },
      search: {
        condition: {
          label: 'Condition, procedure, specialty...',
          placeholder: 'Condition, procedure, specialty...',
        },
        location: {
          label: 'City, state, or zipcode',
          placeholder: 'City, state, or zipcode',
        },
        insurance: {
          label: 'Insurance carrier',
          placeholder: 'Insurance carrier',
        },
        findNow: 'Find now',
      },
      pillars: {
        howItWorks: 'HOW IT WORKS',
        lifestyleMedicine: 'Lifestyle as medicine',
        sixPillars: 'The six pillars',
        tabs: {
          nutrition: 'Nutrition',
          activity: 'Physical activity',
          sleep: 'Restorative sleep',
          stress: 'Stress management',
          social: 'Social connection',
          substance: 'Substance abuse',
        },
        nutrition: {
          title: 'Nutrition',
          description: 'Evidence supports the use of a whole food, plant-predominant diet to prevent, treat and reverse chronic illness.',
        },
        mealPlanning: {
          title: 'Meal Planning',
          description: 'Structured meal planning helps maintain consistent nutrition and supports long-term health goals.',
        },
        mindfulEating: {
          title: 'Mindful Eating',
          description: 'Practice mindful eating techniques to improve digestion and build a healthier relationship with food.',
        },
        activity: {
          title: 'Physical activity',
          description: 'Regular physical activity is key to managing weight, improving mental health, and reducing risk of chronic disease.',
        },
        strength: {
          title: 'Strength Training',
          description: 'Build muscle mass and bone density through regular resistance training exercises.',
        },
        flexibility: {
          title: 'Flexibility',
          description: 'Maintain mobility and prevent injury through regular stretching and flexibility work.',
        },
        sleep: {
          title: 'Restorative sleep',
          description: 'Consistent, quality sleep plays a vital role in both physical and mental health.',
        },
        sleepHygiene: {
          title: 'Sleep Hygiene',
          description: 'Develop healthy sleep habits and create an optimal sleep environment.',
        },
        sleepRecovery: {
          title: 'Sleep Recovery',
          description: 'Monitor and improve sleep quality to enhance physical and mental recovery.',
        },
        stress: {
          title: 'Stress management',
          description: 'Effective stress management techniques help reduce cortisol levels and improve overall well-being.',
        },
        meditation: {
          title: 'Meditation',
          description: 'Practice mindfulness meditation to reduce stress and improve mental clarity.',
        },
        breathing: {
          title: 'Breathing Techniques',
          description: 'Learn breathing exercises to activate the parasympathetic nervous system.',
        },
        social: {
          title: 'Social connection',
          description: 'Strong social connections are associated with a lower risk of many chronic diseases and enhanced mental health.',
        },
        community: {
          title: 'Community Support',
          description: 'Engage with community groups and support networks for better health outcomes.',
        },
        family: {
          title: 'Family Time',
          description: 'Prioritize quality time with family and loved ones for emotional well-being.',
        },
        substance: {
          title: 'Substance abuse',
          description: 'Avoiding tobacco, limiting alcohol use, and abstaining from harmful substances are vital for long-term health.',
        },
        recovery: {
          title: 'Recovery Support',
          description: 'Access professional support and resources for substance abuse recovery.',
        },
        alternatives: {
          title: 'Healthy Alternatives',
          description: 'Replace harmful substances with healthy coping mechanisms and activities.',
        },
      },
      login: {
        doctor: {
          title: 'Doctor Login',
          subtitle: 'Access your professional dashboard',
        },
        patient: {
          title: 'Patient Login',
          subtitle: 'Manage your appointments and health records',
        },
        email: 'Email Address',
        emailPlaceholder: 'Enter your email',
        password: 'Password',
        passwordPlaceholder: 'Enter your password',
        submit: 'Sign In',
      },
      theme: {
        switchToLight: 'Switch to light mode',
        switchToDark: 'Switch to dark mode',
      },
      language: {
        toggle: 'Change language',
      },
      seo: {
        title: 'ProVital - Lifestyle Medicine Experts',
        description: 'Book appointments with lifestyle medicine experts. Optimize your lifestyle and reverse chronic diseases through evidence-based healthcare.',
      },
    },
  },
  es: {
    translation: {
      nav: {
        listPractice: 'Lista tu práctica',
        employers: 'Para Empleadores',
        courses: 'Cursos',
        books: 'Libros',
        speakers: 'Oradores',
        doctors: 'Doctores',
      },
      auth: {
        loginSignup: 'Iniciar Sesión / Registrarse',
        doctor: 'Doctor',
        patient: 'Paciente',
      },
      hero: {
        title: {
          part1: 'Reserva una cita con',
          highlight: 'medicina del estilo de vida',
          part2: 'expertos',
        },
        subtitle: 'Optimiza tu estilo de vida y revierte enfermedades crónicas.',
      },
      search: {
        condition: {
          label: 'Condición, procedimiento, especialidad...',
          placeholder: 'Condición, procedimiento, especialidad...',
        },
        location: {
          label: 'Ciudad, estado o código postal',
          placeholder: 'Ciudad, estado o código postal',
        },
        insurance: {
          label: 'Aseguradora',
          placeholder: 'Aseguradora',
        },
        findNow: 'Buscar ahora',
      },
      pillars: {
        howItWorks: 'CÓMO FUNCIONA',
        lifestyleMedicine: 'Estilo de vida como medicina',
        sixPillars: 'Los seis pilares',
        tabs: {
          nutrition: 'Nutrición',
          activity: 'Actividad física',
          sleep: 'Sueño reparador',
          stress: 'Manejo del estrés',
          social: 'Conexión social',
          substance: 'Abuso de sustancias',
        },
        nutrition: {
          title: 'Nutrición',
          description: 'La evidencia respalda el uso de una dieta integral y predominantemente vegetal para prevenir, tratar y revertir enfermedades crónicas.',
        },
        mealPlanning: {
          title: 'Planificación de Comidas',
          description: 'La planificación estructurada de comidas ayuda a mantener una nutrición consistente y apoya los objetivos de salud a largo plazo.',
        },
        mindfulEating: {
          title: 'Alimentación Consciente',
          description: 'Practica técnicas de alimentación consciente para mejorar la digestión y construir una relación más saludable con la comida.',
        },
        activity: {
          title: 'Actividad física',
          description: 'La actividad física regular es clave para controlar el peso, mejorar la salud mental y reducir el riesgo de enfermedades crónicas.',
        },
        strength: {
          title: 'Entrenamiento de Fuerza',
          description: 'Desarrolla masa muscular y densidad ósea a través de ejercicios regulares de resistencia.',
        },
        flexibility: {
          title: 'Flexibilidad',
          description: 'Mantén la movilidad y previene lesiones a través de estiramientos regulares y trabajo de flexibilidad.',
        },
        sleep: {
          title: 'Sueño reparador',
          description: 'El sueño consistente y de calidad juega un papel vital tanto en la salud física como mental.',
        },
        sleepHygiene: {
          title: 'Higiene del Sueño',
          description: 'Desarrolla hábitos de sueño saludables y crea un ambiente óptimo para dormir.',
        },
        sleepRecovery: {
          title: 'Recuperación del Sueño',
          description: 'Monitorea y mejora la calidad del sueño para mejorar la recuperación física y mental.',
        },
        stress: {
          title: 'Manejo del estrés',
          description: 'Las técnicas efectivas de manejo del estrés ayudan a reducir los niveles de cortisol y mejorar el bienestar general.',
        },
        meditation: {
          title: 'Meditación',
          description: 'Practica la meditación de atención plena para reducir el estrés y mejorar la claridad mental.',
        },
        breathing: {
          title: 'Técnicas de Respiración',
          description: 'Aprende ejercicios de respiración para activar el sistema nervioso parasimpático.',
        },
        social: {
          title: 'Conexión social',
          description: 'Las conexiones sociales fuertes están asociadas con un menor riesgo de muchas enfermedades crónicas y una mejor salud mental.',
        },
        community: {
          title: 'Apoyo Comunitario',
          description: 'Participa en grupos comunitarios y redes de apoyo para mejores resultados de salud.',
        },
        family: {
          title: 'Tiempo en Familia',
          description: 'Prioriza el tiempo de calidad con la familia y seres queridos para el bienestar emocional.',
        },
        substance: {
          title: 'Abuso de sustancias',
          description: 'Evitar el tabaco, limitar el uso de alcohol y abstenerse de sustancias dañinas es vital para la salud a largo plazo.',
        },
        recovery: {
          title: 'Apoyo para la Recuperación',
          description: 'Accede a apoyo profesional y recursos para la recuperación del abuso de sustancias.',
        },
        alternatives: {
          title: 'Alternativas Saludables',
          description: 'Reemplaza las sustancias dañinas con mecanismos de afrontamiento y actividades saludables.',
        },
      },
      login: {
        doctor: {
          title: 'Inicio de Sesión - Doctor',
          subtitle: 'Accede a tu panel profesional',
        },
        patient: {
          title: 'Inicio de Sesión - Paciente',
          subtitle: 'Gestiona tus citas y registros de salud',
        },
        email: 'Dirección de Correo',
        emailPlaceholder: 'Ingresa tu correo',
        password: 'Contraseña',
        passwordPlaceholder: 'Ingresa tu contraseña',
        submit: 'Iniciar Sesión',
      },
      theme: {
        switchToLight: 'Cambiar a modo claro',
        switchToDark: 'Cambiar a modo oscuro',
      },
      language: {
        toggle: 'Cambiar idioma',
      },
      seo: {
        title: 'ProVital - Expertos en Medicina del Estilo de Vida',
        description: 'Reserva citas con expertos en medicina del estilo de vida. Optimiza tu estilo de vida y revierte enfermedades crónicas a través de atención médica basada en evidencia.',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;