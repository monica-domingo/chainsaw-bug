import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white p-6">
            <motion.h1
                className="text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Investigación sobre el Stack Usado
            </motion.h1>
            <motion.p
                className="text-lg mb-6 text-center max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                Este proyecto usa un stack moderno para el desarrollo web con React. A continuación, exploramos sus principales tecnologías.
            </motion.p>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>ShadCN UI</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Una colección de componentes estilizados y altamente reutilizables construidos sobre Radix UI y TailwindCSS.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Framer Motion</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Permite la creación de animaciones fluidas y atractivas con una API declarativa para React.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Vite</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Un entorno de desarrollo rápido y optimizado que mejora la experiencia de desarrollo en React y otras tecnologías modernas.
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                className="mt-8 max-w-2xl text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
            >
                <h2 className="text-2xl font-semibold mb-4">Conclusión</h2>
                <p>
                    El stack utilizado en este proyecto permite una experiencia de desarrollo ágil, con componentes reutilizables y animaciones fluidas. Herramientas como ShadCN y Framer Motion hacen que la creación de interfaces modernas sea más eficiente y atractiva.
                </p>
            </motion.div>
        </div>
    );
}
