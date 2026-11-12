// ============================================================
// HARISH LABSPROJECT DATABASE
// 25 PROJECTS | EMBEDDED | AI | ROBOTICS | IOT | SOFTWARE
// ============================================================

export interface ProjectImage {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  caption: string;
}

export interface ProjectSpecification {
  label: string;
  value: string;
}

export interface ProjectData {
  id: string;
  folderName: string;
  numberStr: string;

  title: string;
  subtitle: string;
  category: string;
  year: string;

  lab?: string;

  shortDescription: string;

  systemOverview?: string;
  engineeringChallenge?: string;
  architecturalSolution?: string;

  hardwareDesign?: string;
  firmwareSoftware?: string;

  specifications?: ProjectSpecification[];

  myRole?: string;

  technologies?: string[];

  pdfUrl?: string;
  sourceCodeUrl?: string;

  images?: ProjectImage[];
}


// ============================================================
// PROJECT DATABASE
// ============================================================

export const PROJECTS: ProjectData[] = [

  // ==========================================================
  // SAFENEST
  // ==========================================================

  {
    id: "proj01",
    folderName: "Proj01",
    numberStr: "01",

    title: "SAFENEST",
    subtitle: "Disaster-Resilient Emergency Communication",

    category: "EMBEDDED & COMMUNICATION",
    year: "2026",

    lab: "HARISH LABS // PROTO_SYS",

    shortDescription:
      "A disaster-resilient communication platform using LoRa and embedded systems to relay emergency information when cellular networks, internet connectivity, or conventional communication infrastructure becomes unavailable.",

    systemOverview:
      "SafeNest is an emergency communication concept designed for disaster situations. It focuses on establishing an independent communication network using LoRa-enabled embedded devices to relay emergency information between affected areas and rescue coordination points.",

    engineeringChallenge:
      "Natural disasters can disrupt cellular networks, internet connectivity, and conventional communication infrastructure. Establishing reliable communication between survivors and rescue coordinators without depending on existing infrastructure is the primary challenge.",

    architecturalSolution:
      "The proposed architecture uses ESP32-based embedded nodes and LoRa communication to exchange emergency messages. The system explores packet transmission, acknowledgement handling, GPS information processing, and a base-station monitoring concept.",

    hardwareDesign:
      "The hardware concept includes ESP32 / ESP32-S3 microcontrollers, LoRa transceivers, GPS modules, battery-powered electronics, and custom PCB development.",

    firmwareSoftware:
      "Embedded C/C++ firmware handles LoRa communication, packet transmission, acknowledgement management, GPS data processing, and emergency information exchange.",

    myRole:
      "Product builder and embedded systems developer. Working on system architecture, embedded hardware integration, communication firmware, and disaster communication concepts.",

    technologies: [
      "ESP32",
      "ESP32-S3",
      "LoRa",
      "GPS",
      "Embedded C",
      "Embedded C++",
      "KiCad",
      "Packet Communication",
      "Acknowledgement Handling",
    ],

    specifications: [],

    images: [],

    pdfUrl:
      "",

    sourceCodeUrl:
      "https://github.com/harishmaduraimani",
  },


  // ==========================================================
  // 02. SHIELDID
  // ==========================================================

  {
    id: "proj02",
    folderName: "Proj02",
    numberStr: "02",

    title: "SHIELDID",
    subtitle: "Smart Safety ID & Emergency System",

    category: "IOT & SAFETY",
    year: "2025",

    shortDescription:
      "A smart safety identification concept integrating location tracking, SOS communication, geofencing, tamper detection, and emergency alert capabilities into a connected safety system.",

    systemOverview:
      "ShieldID explores the integration of embedded electronics, location tracking, and wireless communication into a smart identification and personal safety platform.",

    engineeringChallenge:
      "Developing a compact safety system requires coordination between location tracking, emergency triggering, wireless communication, battery management, and tamper detection.",

    architecturalSolution:
      "The proposed architecture combines a microcontroller, GPS positioning, GSM communication, SOS input, and tamper sensing to support emergency alerts and location-based safety features.",

    hardwareDesign:
      "The hardware concept includes a microcontroller, GPS module, GSM/cellular module, SOS button, tamper sensor, battery, and charging circuitry.",

    firmwareSoftware:
      "Embedded firmware handles GPS tracking, emergency alert generation, safety-zone monitoring concepts, tamper events, and communication management.",

    myRole:
      "Product designer and embedded systems developer. Focused on system architecture, hardware integration, tracking concepts, and emergency communication logic.",

    technologies: [
      "ESP32",
      "STM32",
      "GPS",
      "GSM",
      "Embedded C",
      "Sensors",
      "Geofencing",
      "IoT",
      "Emergency Alerts",
    ],

    specifications: [],
    images: [],
    sourceCodeUrl:
      "https://github.com/harishmaduraimani",
  },


  // ==========================================================
  // 03. INFOSENSE
  // ==========================================================

  {
    id: "proj03",
    folderName: "Proj03",
    numberStr: "03",

    title: "INFOSENSE",
    subtitle: "Healthcare Technology Startup",

    category: "STARTUP & HEALTHCARE",
    year: "2026",

    shortDescription:
      "A healthcare technology startup concept focused on developing practical technology solutions through intelligent monitoring, embedded sensing, artificial intelligence, and connected healthcare systems.",

    systemOverview:
      "InfoSense explores the intersection of healthcare, intelligent sensing, embedded electronics, and AI-driven data processing to develop technology-oriented healthcare solutions.",

    engineeringChallenge:
      "Healthcare technology requires meaningful integration of sensor information, embedded hardware, data processing, and intelligent monitoring into practical applications.",

    architecturalSolution:
      "The concept explores sensor-based embedded systems connected with data processing and AI/ML technologies for future healthcare monitoring applications.",

    hardwareDesign:
      "Exploration of embedded sensing systems, microcontrollers, sensor interfaces, and prototype electronics for healthcare applications.",

    firmwareSoftware:
      "Python-based data processing, AI/ML exploration, embedded firmware concepts, and intelligent monitoring software.",

    myRole:
      "Founder and product builder. Exploring product opportunities, technical architecture, and practical healthcare technology applications.",

    technologies: [
      "Artificial Intelligence",
      "Machine Learning",
      "Embedded Systems",
      "Sensors",
      "IoT",
      "Python",
      "Product Design",
      "Data Processing",
    ],

    specifications: [],
    images: [],
    sourceCodeUrl:
      "https://github.com/harishmaduraimani",
  },


  // ==========================================================
  // 04. ELECTROLAB
  // ==========================================================

  {
    id: "proj04",
    folderName: "Proj04",
    numberStr: "04",

    title: "ELECTROLAB",
    subtitle: "PCB + AI Technology Startup",

    category: "STARTUP & ELECTRONICS",
    year: "2026",

    shortDescription:
      "A technology startup concept combining PCB design, electronics engineering, embedded systems, and artificial intelligence to explore intelligent hardware development and engineering automation.",

    systemOverview:
      "ElectroLab focuses on bringing electronics engineering and intelligent software together through PCB development, embedded hardware, AI integration, and engineering automation.",

    engineeringChallenge:
      "Modern electronics development involves hardware design, component integration, firmware development, and increasingly complex engineering workflows.",

    architecturalSolution:
      "The proposed ecosystem combines custom PCB development, microcontroller-based hardware, embedded firmware, Python-based tools, and AI/ML integration.",

    hardwareDesign:
      "Custom PCB development, ESP32-based embedded systems, electronic interfaces, sensors, and hardware prototyping.",

    firmwareSoftware:
      "Python-based automation, AI/ML integration, embedded firmware, and engineering workflow development.",

    myRole:
      "Founder and product builder. Exploring hardware engineering products, PCB development, and intelligent electronics solutions.",

    technologies: [
      "PCB Design",
      "KiCad",
      "Altium",
      "ESP32",
      "Artificial Intelligence",
      "Python",
      "Embedded Systems",
      "Electronics",
      "Automation",
    ],

    specifications: [],
    images: [],
    sourceCodeUrl:
      "https://github.com/harishmaduraimani",
  },


  // ==========================================================
  // 05. PARKQ
  // ==========================================================

  {
    id: "proj05",
    folderName: "Proj05",
    numberStr: "05",

    title: "PARKQ",
    subtitle: "Smart Mall Parking System",

    category: "STARTUP & SMART SYSTEMS",
    year: "2025",

    shortDescription:
      "A smart mall parking concept designed to simplify parking discovery, vehicle management, and parking availability monitoring through connected sensors, automation, and digital interfaces.",

    systemOverview:
      "ParkQ explores an intelligent parking management ecosystem that connects vehicle detection hardware with parking availability information and a user-facing digital interface.",

    engineeringChallenge:
      "Finding available parking spaces and maintaining accurate parking occupancy information can be difficult in large shopping malls and multi-level parking facilities.",

    architecturalSolution:
      "The proposed architecture uses vehicle detection sensors, microcontrollers, parking indicators, and software-based availability management to represent parking occupancy information.",

    hardwareDesign:
      "Vehicle detection sensors, microcontrollers, parking indicators, and embedded control hardware.",

    firmwareSoftware:
      "Software concepts include parking availability logic, data processing, web interfaces, and automation workflows.",

    myRole:
      "Cofounder and product builder. Working on the product concept, system design, and smart parking solution architecture.",

    technologies: [
      "IoT",
      "Sensors",
      "Embedded Systems",
      "Web Development",
      "Automation",
      "Microcontrollers",
      "Product Design",
    ],

    specifications: [],
    images: [],
    sourceCodeUrl:
      "https://github.com/harishmaduraimani",
  },


  // ==========================================================
  // 06. BUZZES AI
  // ==========================================================

  {
    id: "proj06",
    folderName: "Proj06",
    numberStr: "06",

    title: "BUZZES AI",
    subtitle: "AI Chatbot for Local Businesses",

    category: "AI & SOFTWARE",
    year: "2026",

    shortDescription:
      "An AI chatbot concept designed to help local businesses automate customer conversations, provide business information, and improve digital customer engagement through intelligent conversational systems.",

    systemOverview:
      "Buzzes AI explores conversational AI applications for local businesses by combining large language models, natural language processing, chatbot interfaces, and workflow automation.",

    engineeringChallenge:
      "Local businesses frequently handle repetitive customer questions, service enquiries, and information requests that require time and manual attention.",

    architecturalSolution:
      "The proposed system combines LLM-based conversational intelligence, Python integration, chatbot interfaces, and n8n automation workflows to support business communication.",

    hardwareDesign:
      "The system primarily uses computer systems and cloud or local AI infrastructure. Optional edge computing devices can support future deployments.",

    firmwareSoftware:
      "LLM integration, NLP, Python-based chatbot logic, conversational interfaces, and n8n automation workflows.",

    myRole:
      "AI product builder. Exploring conversational AI architecture, chatbot development, and business automation applications.",

    technologies: [
      "LLM",
      "NLP",
      "Python",
      "Chatbots",
      "n8n",
      "Web Development",
      "AI Integration",
      "Automation",
    ],

    specifications: [],
    images: [],
    sourceCodeUrl:
      "https://github.com/harishmaduraimani",
  },


  // ==========================================================
  // 07. CERTZ
  // ==========================================================

  {
    id: "proj07",
    folderName: "Proj07",
    numberStr: "07",

    title: "CERTZ",
    subtitle: "Certificate Generation Platform",

    category: "SOFTWARE & PRODUCT",
    year: "2026",

    shortDescription:
      "A browser-based certificate generation platform that automates personalized certificate creation using structured data and Excel spreadsheets, with client-side document processing.",

    systemOverview:
      "CertZ is a web-based certificate generation platform designed to simplify bulk certificate creation. Users can provide structured information and generate personalized certificates through a browser-based workflow.",

    engineeringChallenge:
      "Manually preparing certificates for large groups requires repetitive editing, individual data entry, and document export operations.",

    architecturalSolution:
      "A browser-based application processes structured spreadsheet data and generates personalized certificates using reusable templates and client-side document processing.",

    hardwareDesign:
      "Runs in a standard computer environment through a modern web browser without requiring dedicated hardware.",

    firmwareSoftware:
      "React and TypeScript power the user interface and application logic. ExcelJS handles spreadsheet processing, while browser-based functionality supports certificate generation.",

    myRole:
      "Founder and developer. Responsible for product development, frontend architecture, spreadsheet integration, and client-side processing workflows.",

    technologies: [
      "React",
      "TypeScript",
      "JavaScript",
      "ExcelJS",
      "HTML",
      "CSS",
      "Client-Side Processing",
      "Web Development",
    ],

    specifications: [],
    images: [],
    sourceCodeUrl:
      "https://github.com/harishmaduraimani",
  },


  // ==========================================================
  // 08. COPILOT AI
  // ==========================================================

  {
    id: "proj08",
    folderName: "Proj08",
    numberStr: "08",

    title: "COPILOT AI",
    subtitle: "Smart Single-Pilot Operations System",

    category: "AI & AVIATION",
    year: "2025",

    shortDescription:
      "An AI-assisted aviation decision-support concept exploring flight information processing, fuel analysis, route evaluation, alerts, and alternate-airport recommendations for single-pilot operations.",

    systemOverview:
      "Copilot AI explores how machine learning and intelligent software can assist single-pilot operations through structured aviation information, predictive analysis, and decision-support interfaces.",

    engineeringChallenge:
      "Single-pilot operations involve multiple information sources, including fuel conditions, route information, flight data, and alternate-airport considerations.",

    architecturalSolution:
      "The proposed architecture combines Python-based data processing and machine-learning components with a React dashboard to organize aviation information and generate decision-support insights.",

    hardwareDesign:
      "A tablet or dashboard interface with an edge-computing concept and aviation data interfaces.",

    firmwareSoftware:
      "Python-based machine-learning exploration, fuel prediction, route analysis, alternate-airport recommendation concepts, and React dashboard development.",

    myRole:
      "AI developer and system designer. Exploring aviation data processing, machine-learning applications, and decision-support system architecture.",

    technologies: [
      "Python",
      "Machine Learning",
      "React",
      "Artificial Intelligence",
      "FMS Data",
      "Data Processing",
      "Fuel Prediction",
      "Route Analysis",
    ],

    specifications: [],
    images: [],
    sourceCodeUrl:
      "https://github.com/harishmaduraimani",
  },


  // ==========================================================
  // 09. ROBOCORE
  // ==========================================================

  {
    id: "proj09",
    folderName: "Proj09",
    numberStr: "09",

    title: "ROBOCORE",
    subtitle: "Mining Rover Communication",

    category: "ROBOTICS & AUTOMATION",
    year: "2026",

    shortDescription:
      "A mining rover communication and robotics concept focused on embedded control, wireless communication, sensor integration, and robotic operation in challenging mining environments.",

    systemOverview:
      "RoboCore explores communication and embedded robotics architectures for mobile rover platforms intended for challenging environments such as mining operations.",

    engineeringChallenge:
      "Robotic systems operating in challenging environments require dependable communication, embedded control, sensor integration, and coordinated movement.",

    architecturalSolution:
      "The proposed architecture combines ESP32-based embedded systems, wireless communication modules, rover hardware, and ROS 2-based robotics software exploration.",

    hardwareDesign:
      "The rover concept includes a mobile chassis, ESP32 systems, motors, motor drivers, sensors, and wireless communication hardware.",

    firmwareSoftware:
      "Embedded C/C++ for hardware control, LoRa communication, telemetry handling, and robot-control logic. ROS 2 and Gazebo are used for robotics development and simulation exploration.",

    myRole:
      "Robotics and embedded systems developer. Exploring rover communication, embedded control, and robotic system integration.",

    technologies: [
      "ESP32",
      "LoRa",
      "ROS 2",
      "Gazebo",
      "Embedded C",
      "Embedded C++",
      "Robotics",
      "Telemetry",
      "Motor Control",
    ],

    specifications: [],
    images: [],
    sourceCodeUrl:
      "https://github.com/harishmaduraimani",
  },


  // ==========================================================
  // 10. AUTONOMOUS ROBOT
  // ==========================================================

  {
    id: "proj10",
    folderName: "Proj10",
    numberStr: "10",

    title: "AUTONOMOUS ROBOT",
    subtitle: "Mobile Robotics & Navigation",

    category: "ROBOTICS",
    year: "2025",

    shortDescription:
      "A mobile robotics project exploring autonomous navigation, sensor integration, robot simulation, motion control, and embedded hardware interaction.",

    systemOverview:
      "The project explores autonomous mobile robot development through robotics middleware, simulation environments, sensor processing, and embedded hardware integration.",

    engineeringChallenge:
      "Autonomous mobile robots require coordination between sensing, movement control, environmental understanding, and navigation software.",

    architecturalSolution:
      "The development approach combines ROS 2, Gazebo simulation, Python/C++ software, sensors, and microcontroller-based robot hardware.",

    hardwareDesign:
      "The robot platform includes a mobile chassis, motors, motor drivers, sensors, and a microcontroller for hardware integration.",

    firmwareSoftware:
      "ROS 2-based robotics development, Gazebo simulation, Python and C++ programming, sensor processing, and control algorithm exploration.",

    myRole:
      "Robotics developer. Working on mobile robot integration, navigation concepts, simulation, and embedded control.",

    technologies: [
      "ROS 2",
      "Gazebo",
      "Python",
      "C++",
      "Sensors",
      "Control Systems",
      "Embedded Systems",
      "Robotics",
    ],

    specifications: [],
    images: [],
    sourceCodeUrl:
      "https://github.com/harishmaduraimani",
  },


  // ==========================================================
  // 11. ROBOTIC ARM
  // ==========================================================

  {
    id: "proj11",
    folderName: "Proj11",
    numberStr: "11",

    title: "ROBOTIC ARM",
    subtitle: "Robotic Control & Automation",

    category: "ROBOTICS & CONTROL",
    year: "2025",

    shortDescription:
      "A robotic arm development project exploring servo-based motion control, embedded programming, mechanical integration, and automation using microcontrollers.",

    systemOverview:
      "The project explores robotic arm control through microcontroller-based electronics, servo actuation, and programmable motion-control logic.",

    engineeringChallenge:
      "Controlling multiple servo motors requires coordinated movement commands, suitable signal generation, and integration between mechanical and electronic components.",

    architecturalSolution:
      "The proposed control architecture uses a microcontroller to generate servo control signals and execute programmed motion sequences.",

    hardwareDesign:
      "The hardware consists of servo motors, a microcontroller, motor-control electronics, and a mechanical robotic arm structure.",

    firmwareSoftware:
      "Embedded C and C programming for servo control, motion sequences, and robotic automation logic.",

    myRole:
      "Robotics developer. Exploring embedded motion control, servo integration, and robotic automation.",

    technologies: [
      "Embedded C",
      "C Programming",
      "STM32",
      "ESP32",
      "Servo Motors",
      "Control Systems",
      "Robotics",
    ],

    specifications: [],
    images: [],
    sourceCodeUrl:
      "https://github.com/harishmaduraimani",
  },


  // ==========================================================
  // 12. SMART DUSTBIN
  // ==========================================================

  {
    id: "proj12",
    folderName: "Proj12",
    numberStr: "12",

    title: "SMART DUSTBIN",
    subtitle: "Smart Waste Management",

    category: "IOT & AUTOMATION",
    year: "2024",

    shortDescription:
      "A smart waste-management prototype using sensors and embedded control to automate bin interaction and improve basic waste-bin usability.",

    systemOverview:
      "The Smart Dustbin project explores sensor-based automation for waste management through ultrasonic sensing, microcontroller processing, and servo motor control.",

    engineeringChallenge:
      "Conventional dustbins require direct physical interaction. Automating lid movement requires sensor-based detection and coordinated actuator control.",

    architecturalSolution:
      "An ultrasonic sensor provides distance information to a microcontroller, which processes the sensor input and controls a servo motor for automated bin interaction.",

    hardwareDesign:
      "The prototype uses an ultrasonic sensor, Arduino or ESP32 microcontroller, servo motor, and power supply.",

    firmwareSoftware:
      "Embedded C firmware processes ultrasonic sensor information and controls servo motor movement based on the programmed detection logic.",

    myRole:
      "Embedded developer. Worked on sensor integration, microcontroller programming, and automated motor-control logic.",

    technologies: [
      "Arduino",
      "ESP32",
      "Ultrasonic Sensor",
      "Servo Motor",
      "Embedded C",
      "IoT",
      "Sensor Processing",
    ],

    specifications: [],
    images: [],
    sourceCodeUrl:
      "https://github.com/harishmaduraimani",
  },


  // ==========================================================
  // 13. RSNA KNEE AI
  // ==========================================================

  {
    id: "proj13",
    folderName: "Proj13",
    numberStr: "13",

    title: "RSNA KNEE AI",
    subtitle: "Medical Imaging & Abnormality Detection",

    category: "AI / ML / COMPUTER VISION",
    year: "2026",

    shortDescription:
      "A medical imaging and deep-learning project exploring automated knee abnormality detection using the RSNA dataset, PyTorch, GPU computing, and DINOv3 feature extraction.",

    systemOverview:
      "RSNA Knee AI explores deep-learning approaches for identifying abnormalities in knee medical images. The project uses medical imaging datasets and neural-network architectures for multi-label prediction.",

    engineeringChallenge:
      "Medical image analysis involves extracting meaningful visual features and identifying multiple possible abnormalities from complex imaging data.",

    architecturalSolution:
      "The project explores a PyTorch-based machine-learning pipeline using DINOv3 feature extraction and multi-label prediction across knee abnormality categories.",

    hardwareDesign:
      "GPU-based machine-learning training environment using a compatible computing workstation or cloud GPU infrastructure.",

    firmwareSoftware:
      "Python and PyTorch are used for dataset processing, feature extraction, model training, validation, and abnormality prediction.",

    myRole:
      "ML practitioner. Working on medical image processing, deep-learning experimentation, feature extraction, and multi-label abnormality detection.",

    technologies: [
      "Python",
      "PyTorch",
      "DINOv3",
      "Computer Vision",
      "Deep Learning",
      "GPU Computing",
      "Machine Learning",
      "Medical Imaging",
    ],

    specifications: [],
    images: [],
    sourceCodeUrl:
      "https://github.com/harishmaduraimani",
  },


  // ==========================================================
  // 14. FACE DETECTION AI
  // ==========================================================

  {
    id: "proj14",
    folderName: "Proj14",
    numberStr: "14",

    title: "FACE DETECTION AI",
    subtitle: "Computer Vision Experiment",

    category: "AI & COMPUTER VISION",
    year: "2025",

    shortDescription:
      "A computer-vision experiment exploring automated face detection and visual recognition pipelines using image-processing techniques and AI-based models.",

    systemOverview:
      "The project explores computer vision techniques for detecting human faces from visual input using camera or image-based processing pipelines.",

    engineeringChallenge:
      "Automated face detection requires processing visual information and identifying relevant facial regions within images or camera input.",

    architecturalSolution:
      "The proposed processing pipeline uses Python and OpenCV for image acquisition, image processing, and face detection model integration.",

    hardwareDesign:
      "A camera connected to a computer or compatible edge-computing device.",

    firmwareSoftware:
      "Python-based image processing and OpenCV integration for computer-vision experimentation.",

    myRole:
      "AI/ML developer. Exploring image processing, face detection, and computer-vision pipelines.",

    technologies: [
      "Python",
      "OpenCV",
      "Computer Vision",
      "Deep Learning",
      "Image Processing",
      "Face Detection",
    ],

    specifications: [],
    images: [],
    sourceCodeUrl:
      "https://github.com/harishmaduraimani",
  },


  // ==========================================================
  // 15. NUMBER PLATE AI
  // ==========================================================

  {
    id: "proj15",
    folderName: "Proj15",
    numberStr: "15",

    title: "NUMBER PLATE AI",
    subtitle: "Vehicle Number Plate Detection",

    category: "AI & COMPUTER VISION",
    year: "2025",

    shortDescription:
      "A computer-vision project exploring vehicle number-plate detection and recognition through image processing, optical character recognition, and AI-based visual analysis.",

    systemOverview:
      "The project explores an automated vehicle number-plate processing pipeline that identifies number-plate regions from visual input and investigates character recognition.",

    engineeringChallenge:
      "Vehicle number-plate recognition requires identifying the plate region and extracting readable characters from images captured under varying visual conditions.",

    architecturalSolution:
      "The proposed pipeline combines Python, OpenCV, image processing, and OCR-based character recognition concepts.",

    hardwareDesign:
      "Camera-based visual input connected to a computer or compatible edge-computing device.",

    firmwareSoftware:
      "Python and OpenCV handle image processing, number-plate region detection, and integration with OCR concepts.",

    myRole:
      "Computer vision developer. Exploring vehicle identification, image processing, and automated recognition pipelines.",

    technologies: [
      "Python",
      "OpenCV",
      "Computer Vision",
      "OCR",
      "AI",
      "Image Processing",
      "Number Plate Recognition",
    ],

    specifications: [],
    images: [],
    sourceCodeUrl:
      "https://github.com/harishmaduraimani",
  },


  // ==========================================================
  // 16. ESP32-S3 PCB
  // ==========================================================

  {
    id: "proj16",
    folderName: "Proj16",
    numberStr: "16",

    title: "ESP32-S3 PCB",
    subtitle: "Custom Embedded Hardware Design",

    category: "PCB & ELECTRONICS",
    year: "2026",

    shortDescription:
      "Custom embedded hardware design work focused on developing compact ESP32-S3-based PCB solutions instead of relying exclusively on development boards.",

    systemOverview:
      "The project explores custom PCB development around the ESP32-S3 microcontroller, including component placement, electronic interfaces, power circuitry, and embedded hardware integration.",

    engineeringChallenge:
      "Moving from development boards to custom hardware requires understanding component connections, power requirements, PCB layout, routing, and hardware validation.",

    architecturalSolution:
      "The design approach uses an ESP32-S3-based hardware architecture with supporting power-management circuitry, connectors, and sensor interfaces.",

    hardwareDesign:
      "Custom PCB development featuring ESP32-S3, power-management circuitry, connectors, sensor interfaces, and electronic components. Includes exploration of single-layer and two-layer PCB design.",

    firmwareSoftware:
      "Embedded C firmware development and hardware testing for custom microcontroller-based PCB systems.",

    myRole:
      "PCB and embedded developer. Working on schematic design, PCB layout, component integration, firmware development, and hardware testing.",

    technologies: [
      "ESP32-S3",
      "KiCad",
      "Altium",
      "PCB Design",
      "Embedded C",
      "Electronics",
      "Power Management",
      "Hardware Testing",
    ],

    specifications: [],
    images: [],
  },


  // ==========================================================
  // 17. MAGNETOMETER VEHICLE DETECTION
  // ==========================================================

  {
    id: "proj17",
    folderName: "Proj17",
    numberStr: "17",

    title: "MAGNETOMETER VEHICLE DETECTION",
    subtitle: "Vehicle Detection with MQTT",

    category: "EMBEDDED & IOT",
    year: "2025",

    shortDescription:
      "A sensor-based vehicle detection concept using magnetometer sensing and MQTT communication to detect vehicle-related magnetic field changes and transmit monitoring information.",

    systemOverview:
      "The project explores magnetometer-based vehicle detection by combining magnetic field sensing, ESP32-based embedded processing, and MQTT communication.",

    engineeringChallenge:
      "Vehicle detection using magnetic sensing requires monitoring changes in the surrounding magnetic field and processing sensor information into meaningful detection events.",

    architecturalSolution:
      "A magnetometer connected to an ESP32 provides sensor information that can be processed by embedded firmware and communicated through MQTT.",

    hardwareDesign:
      "The hardware concept includes a magnetometer sensor, ESP32 microcontroller, sensor interface, and power system.",

    firmwareSoftware:
      "Embedded firmware handles sensor communication, magnetic field data processing, event generation, and MQTT-based information transmission.",

    myRole:
      "Embedded IoT developer. Exploring magnetic sensing, embedded processing, and MQTT communication.",

    technologies: [
      "Magnetometer",
      "ESP32",
      "MQTT",
      "Python",
      "IoT",
      "Embedded C",
      "Sensors",
      "Wireless Communication",
    ],

    specifications: [],
    images: [],
  },


  // ==========================================================
  // 18. AI / LLM / NLP LAB
  // ==========================================================

  {
    id: "proj18",
    folderName: "Proj18",
    numberStr: "18",

    title: "AI / LLM / NLP LAB",
    subtitle: "AI Models, Chatbots & Intelligent Systems",

    category: "AI / LLM / NLP",
    year: "2026",

    shortDescription:
      "An ongoing experimentation environment exploring artificial intelligence, machine learning, large language models, natural language processing, chatbot integration, workflow automation, and edge AI.",

    systemOverview:
      "AI / LLM / NLP Lab is a collection of ongoing technical experiments focused on understanding and integrating intelligent models into practical software and embedded applications.",

    engineeringChallenge:
      "AI application development involves model selection, data processing, inference integration, workflow orchestration, and adapting computational requirements to available hardware.",

    architecturalSolution:
      "The exploration combines Python-based AI development, PyTorch experimentation, LLM integration, NLP pipelines, chatbot interfaces, and automation workflows.",

    hardwareDesign:
      "Exploration of GPU computing systems, Raspberry Pi, ESP32, and other compatible edge-computing hardware.",

    firmwareSoftware:
      "Python, PyTorch, LLM integration, NLP experimentation, chatbot development, and n8n-based workflow automation.",

    myRole:
      "AI explorer and developer. Experimenting with machine learning, deep learning, intelligent applications, and edge AI integration.",

    technologies: [
      "Python",
      "PyTorch",
      "LLM",
      "NLP",
      "n8n",
      "Machine Learning",
      "Deep Learning",
      "Edge AI",
      "Raspberry Pi",
      "ESP32",
    ],

    specifications: [],
    images: [],
  },


  // ==========================================================
  // 19. MACHINE GRID
  // ==========================================================

  {
    id: "proj19",
    folderName: "Proj19",
    numberStr: "19",

    title: "MACHINE GRID",
    subtitle: "Industrial Machine Health Monitoring IoT",

    category: "IOT & INDUSTRIAL AUTOMATION",
    year: "2026",

    shortDescription:
      "An IoT-based industrial monitoring system concept designed to collect machine condition information using embedded sensors and provide useful data for equipment monitoring and maintenance.",

    systemOverview:
      "Machine Grid explores industrial machine health monitoring through connected sensors, embedded data acquisition, wireless communication, and monitoring dashboard concepts.",

    engineeringChallenge:
      "Monitoring industrial machine conditions requires collecting sensor information, processing measurements, and making condition data accessible for maintenance and monitoring.",

    architecturalSolution:
      "The proposed architecture combines ESP32-based sensor acquisition, DS18B20 temperature sensing, MPU6050 motion sensing, and MQTT communication.",

    hardwareDesign:
      "The hardware concept includes an ESP32, DS18B20 temperature sensor, MPU6050 motion sensor, sensor interfaces, and power circuitry.",

    firmwareSoftware:
      "Embedded firmware collects sensor information, processes machine condition data, and explores MQTT-based communication with a monitoring dashboard.",

    myRole:
      "IoT and embedded systems developer. Exploring industrial sensing, sensor integration, embedded firmware, and machine monitoring architecture.",

    technologies: [
      "IoT",
      "ESP32",
      "DS18B20",
      "MPU6050",
      "I2C",
      "Embedded C",
      "MQTT",
      "Sensor Processing",
    ],

    specifications: [],
    images: [],
  },


  // ==========================================================
  // 20. COW COTTAGE MONITORING
  // ==========================================================

  {
    id: "proj20",
    folderName: "Proj20",
    numberStr: "20",

    title: "COW COTTAGE MONITORING",
    subtitle: "Livestock Health & Movement Tracking",

    category: "IOT & AGRITECH",
    year: "2026",

    shortDescription:
      "A smart livestock monitoring concept designed to track cow movement, location, activity, and environmental conditions within a cattle-cottage environment using connected sensors and embedded systems.",

    systemOverview:
      "Cow Cottage Monitoring explores an IoT-based livestock monitoring ecosystem that combines animal tracking, environmental sensing, and wireless communication.",

    engineeringChallenge:
      "Livestock monitoring requires collecting information from multiple sensing sources and communicating useful location and activity information across a monitoring system.",

    architecturalSolution:
      "The proposed system combines ESP32-based embedded hardware, GPS, wearable or animal sensors, environmental sensors, and wireless communication through Wi-Fi, GSM, SMS, and MQTT concepts.",

    hardwareDesign:
      "The hardware concept includes ESP32, GPS modules, wearable or animal sensors, environmental sensors, and wireless communication hardware.",

    firmwareSoftware:
      "Embedded firmware processes sensor information, GPS tracking data, and monitoring events, with MQTT-based communication and dashboard concepts.",

    myRole:
      "IoT and embedded systems developer. Exploring livestock tracking, connected sensing, and smart agricultural monitoring.",

    technologies: [
      "IoT",
      "ESP32",
      "GPS",
      "GSM",
      "Wi-Fi",
      "SMS",
      "Sensors",
      "MQTT",
      "Embedded C",
      "Agritech",
    ],

    specifications: [],
    images: [],
  },


  // ==========================================================
  // 21. FUNDVISION
  // ==========================================================

  {
    id: "proj21",
    folderName: "Proj21",
    numberStr: "21",

    title: "FUNDVISION",
    subtitle: "Client-Side Mutual Fund Analytics Browser Extension",

    category: "BROWSER EXTENSION & FINTECH",
    year: "2026",

    shortDescription:
      "A client-side mutual fund analytics browser extension that imports fund data and provides interactive performance, risk, portfolio, and comparative analysis through browser-based data processing.",

    systemOverview:
      "FundVision is a browser-based financial analytics tool designed to process mutual fund information locally and present useful investment-related data through interactive dashboards and visualizations.",

    engineeringChallenge:
      "Analyzing mutual fund information requires processing structured financial data, organizing fund attributes, and presenting performance and risk information in an understandable format.",

    architecturalSolution:
      "The application uses a browser-extension architecture with React and TypeScript for the interface and JavaScript-based client-side processing for imported Excel/XLSX data.",

    hardwareDesign:
      "Designed to run on standard computers and laptops through a compatible web browser.",

    firmwareSoftware:
      "React, TypeScript, JavaScript, Excel/XLSX processing, browser extension APIs, and interactive data visualization.",

    myRole:
      "Product developer. Responsible for product architecture, frontend development, financial data processing, and browser-based analytics workflows.",

    technologies: [
      "React",
      "TypeScript",
      "JavaScript",
      "Excel",
      "XLSX",
      "Browser Extension APIs",
      "Data Visualization",
      "Financial Analytics",
    ],

    specifications: [],

    images: [],
  },


  // ==========================================================
  // 22. HOME EXPENSE TRACKER
  // ==========================================================

  {
    id: "proj22",
    folderName: "Proj22",
    numberStr: "22",

    title: "HOME EXPENSE TRACKER",
    subtitle: "Personal Finance & Expense Management",

    category: "SOFTWARE & FINTECH",
    year: "2023",

    shortDescription:
      "A personal finance management application designed to record, organize, and analyze household expenses and understand spending patterns through a simple digital interface.",

    systemOverview:
      "The Home Expense Tracker explores digital household expense management through structured transaction recording, expense categorization, and financial visualization.",

    engineeringChallenge:
      "Tracking household expenses manually can make it difficult to organize spending information and understand financial patterns over time.",

    architecturalSolution:
      "A web-based application uses structured expense records, local data management, and visualization components to present household spending information.",

    hardwareDesign:
      "Designed for use on standard computers and mobile devices.",

    firmwareSoftware:
      "React, TypeScript, JavaScript, local storage, and data visualization for expense management.",

    myRole:
      "Product and software developer. Worked on application structure, expense management workflows, and financial data visualization.",

    technologies: [
      "React",
      "TypeScript",
      "JavaScript",
      "Data Visualization",
      "Local Storage",
      "Web Development",
    ],

    specifications: [],
    images: [],
  },


  // ==========================================================
  // 23. QR TRACK
  // ==========================================================

  {
    id: "proj23",
    folderName: "Proj23",
    numberStr: "23",

    title: "QR TRACK",
    subtitle: "QR-Based Tracking & Management System",

    category: "SOFTWARE & AUTOMATION",
    year: "2024",

    shortDescription:
      "A QR-based tracking and management system designed to identify, update, and monitor records using scannable digital identifiers and a web-based management interface.",

    systemOverview:
      "QR Track explores the use of QR codes as digital identifiers for connecting physical items or records with corresponding information stored in a software system.",

    engineeringChallenge:
      "Managing and identifying records manually can become difficult when multiple items require unique identification and regular information updates.",

    architecturalSolution:
      "The proposed system combines QR code generation and scanning with a web application for identifying and managing associated records.",

    hardwareDesign:
      "QR codes can be scanned using smartphones or compatible QR scanning devices.",

    firmwareSoftware:
      "React, TypeScript, JavaScript, QR generation and scanning functionality, and web-based data management.",

    myRole:
      "Software and product developer. Exploring QR-based identification, record management, and web application development.",

    technologies: [
      "QR Code",
      "React",
      "TypeScript",
      "JavaScript",
      "Database",
      "Web Development",
      "QR Scanning",
      "Automation",
    ],

    specifications: [],
    images: [],
  },


  // ==========================================================
  // 24. CYBER THREAT AI
  // ==========================================================

  {
    id: "proj24",
    folderName: "Proj24",
    numberStr: "24",

    title: "CYBER THREAT AI",
    subtitle: "AI-Based Cyber Threat Detection",

    category: "AI & CYBERSECURITY",
    year: "2025",

    shortDescription:
      "An AI and machine-learning concept exploring the identification of suspicious patterns, anomalies, and potential cybersecurity threats through security-related data analysis.",

    systemOverview:
      "Cyber Threat AI explores machine-learning applications in cybersecurity by analyzing security-related information and investigating methods for detecting unusual patterns.",

    engineeringChallenge:
      "Cybersecurity monitoring involves processing large amounts of information and identifying unusual patterns that may indicate suspicious activity.",

    architecturalSolution:
      "The proposed approach combines Python-based data processing, machine-learning models, anomaly detection concepts, and security data visualization.",

    hardwareDesign:
      "A standard computer or machine-learning workstation, with optional GPU computing support.",

    firmwareSoftware:
      "Python-based machine-learning experimentation, anomaly detection, NLP concepts, security-data processing, and visualization.",

    myRole:
      "AI/ML developer. Exploring machine-learning approaches for anomaly identification and cybersecurity data analysis.",

    technologies: [
      "Python",
      "Machine Learning",
      "Cybersecurity",
      "Anomaly Detection",
      "NLP",
      "Data Analysis",
      "Data Visualization",
    ],

    specifications: [],
    images: [],
  },


  // ==========================================================
  // 25. ML FUND ANALYSIS
  // ==========================================================

  {
    id: "proj25",
    folderName: "Proj25",
    numberStr: "25",

    title: "ML FUND ANALYSIS",
    subtitle: "Machine Learning-Based Mutual Fund Analysis",

    category: "AI / ML / FINANCIAL ANALYTICS",
    year: "2025",

    shortDescription:
      "A machine-learning project exploring mutual fund performance, risk patterns, and financial data analysis through Python-based data processing and predictive modelling techniques.",

    systemOverview:
      "ML Fund Analysis explores the application of machine-learning techniques to mutual fund datasets for identifying patterns in fund performance and risk-related information.",

    engineeringChallenge:
      "Mutual fund analysis involves processing multiple financial attributes and identifying meaningful relationships between performance, risk, and historical data.",

    architecturalSolution:
      "The proposed analytical workflow combines structured financial datasets, Python data-processing libraries, and machine-learning algorithms to investigate fund-related patterns.",

    hardwareDesign:
      "A standard computer or machine-learning workstation with optional GPU computing support.",

    firmwareSoftware:
      "Python-based data processing and machine-learning workflows using Pandas, NumPy, and Scikit-learn.",

    myRole:
      "ML developer. Exploring financial dataset processing, machine-learning models, and data-driven fund analysis.",

    technologies: [
      "Python",
      "Machine Learning",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Data Analysis",
      "Financial Analytics",
    ],

    specifications: [],
    images: [],
  },

];