import { useState } from "react";
import { Button, Container, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Psychology, Devices, AccessTime } from "@mui/icons-material";
import ModalStart from "../components/ModalStart/ModalStart";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  // URLs de las imágenes
  const IMAGES = {
    logo: "https://repositorio.urp.edu.pe/assets/custom/images/Logo_verde.png",
    estudiantes: "https://elcomercio.pe/resizer/v2/TCLROML44RESFGLZJ5BKOVHCZY.jpg?auth=6f15cb5a2b4f76947509965f9577fd53aeba28e5e6b76746807eaee0d34baca5&width=1200&height=799&quality=75&smart=true"
  };

  return (
    <Box>
      {/* Header con Logo */}
      <Box
        sx={{
          bgcolor: 'white',
          py: 2,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          position: 'relative',
          zIndex: 10
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src={IMAGES.logo}
              alt="Universidad Ricardo Palma"
              style={{ 
                height: '60px',
                objectFit: 'contain'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </Box>
        </Container>
      </Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 50%, #66BB6A 100%)',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid 
          container 
          spacing={4} 
          alignItems="center" 
          justifyContent="center"
          >
            {/* Left side - Main content */}
            <Grid item xs={12} md={6}
              sx={{ 
                  display: 'flex', 
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  alignItems: 'center' // opcional si quieres también centrar vertical
                }}
            >
              <Box sx={{ color: 'white', textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 300,
                    mb: 2,
                    opacity: 0.9,
                    letterSpacing: '0.5px'
                  }}
                >
                  Test Vocacional
                </Typography>
                
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    lineHeight: 1.1,
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  Visualiza
                  <Box component="span" sx={{ color: '#E8F5E8' }}>
                    URP
                  </Box>
                </Typography>
                
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 400,
                    mb: 4,
                    opacity: 0.95,
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                    maxWidth: '500px',
                    mx: { xs: 'auto', md: 0 }
                  }}
                >
                  ¡Descubre tu carrera ideal!
                </Typography>
                
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setOpenModal(true)}
                  sx={{
                    bgcolor: '#1B5E20',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: '30px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    boxShadow: '0 4px 20px rgba(27,94,32,0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: '#0D4E14',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 25px rgba(27,94,32,0.4)',
                    }
                  }}
                >
                  Inicia el Test
                </Button>
              </Box>
            </Grid>
            
            {/* Right side - Imagen de estudiantes */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: { xs: '250px', md: '400px' },
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  position: 'relative',
                  "@media (max-width: 380px)": {
                  mb: "15px" 
                }
                  
                }}
              >
                <img 
                  src={IMAGES.estudiantes}
                  alt="Estudiantes URP"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback si no carga la imagen */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255,255,255,0.1)',
                    border: '2px dashed rgba(255,255,255,0.3)',
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'rgba(255,255,255,0.8)',
                      textAlign: 'center',
                      fontWeight: 300
                    }}
                  >
                    [Imagen de estudiantes URP]
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* What is VisualizaURP Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid 
          container 
          spacing={{ xs: 4, md: 8 }}
          sx={{justifyContent: {xs: 'center', md: 'left'}}}
        >
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              sx={{
                color: '#1B5E20',
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '2rem', md: '3rem' },
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              ¿Qué es
              <br />
              <Box component="span" sx={{ color: '#4CAF50' }}>
                VISUALIZA URP?
              </Box>
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: '#555',
                mb: 3,
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              Este <Box component="span" sx={{ fontWeight: 'bold', color: '#1B5E20' }}>
                test vocacional gratuito
              </Box> ha sido diseñado para ayudar a estudiantes de secundaria que se 
              encuentran indecisos acerca de qué carrera elegir. Nuestro test vocacional online te asistirá en la 
              toma de una decisión más informada sobre qué carrera estudiar y resolverá algunas de las 
              preguntas más comunes, como: <Box component="span" sx={{ fontWeight: 'bold', color: '#1B5E20' }}>
                ¿No sé qué estudiar?
              </Box>, <Box component="span" sx={{ fontWeight: 'bold', color: '#1B5E20' }}>
                ¿No sé qué carrera elegir?
              </Box>
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: '#555',
                fontWeight: 500,
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              ¡Comienza el <Box component="span" sx={{ fontWeight: 'bold', color: '#1B5E20' }}>
                test de orientación vocacional
              </Box> ahora mismo y da inicio a tu camino 
              profesional!
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: '#F1F8E9', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid c
          container 
          spacing={{ xs: 4, md: 6 }} 
          justifyContent="center" 
          alignItems="center"
          >
            {/* Left side - Imagen */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: { xs: '250px', md: '350px' },
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(46,125,50,0.15)',
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center' 
                }}
              >
                <img 
                  src={IMAGES.estudiantes}
                  alt="Estudiantes trabajando"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback si no carga la imagen */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, #E8F5E8, #C8E6C8)',
                    border: '2px dashed #4CAF50',
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#2E7D32',
                      textAlign: 'center',
                      fontWeight: 300
                    }}
                  >
                    [Imagen de estudiantes trabajando]
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            {/* Right side - Features */}
            <Grid item xs={12} md={6}>
              <Box sx={{ pl: { xs: 0, md: 4 } }}>
                {[
                  {
                    icon: <Psychology sx={{ fontSize: 40, color: '#2E7D32' }} />,
                    title: "Elaborado por especialistas",
                    description: "El test vocacional VisualizaURP ha sido creado por psicólogos expertos en temas de orientación vocacional utilizando teorías de Personalidad de Holland e Inteligencias Múltiples de Gardner."
                  },
                  {
                    icon: <Devices sx={{ fontSize: 40, color: '#2E7D32' }} />,
                    title: "Resuélvelo en cualquier dispositivo",
                    description: "Puedes completar el test vocacional desde cualquier dispositivo electrónico ya sea laptop, computadora de escritorio o una tablet."
                  },
                  {
                    icon: <AccessTime sx={{ fontSize: 40, color: '#2E7D32' }} />,
                    title: "Tiempo óptimo",
                    description: "El proceso es sencillo. Responde a todas las preguntas de este test vocacional y al final dale clic al botón ¡Conoce tus resultados!"
                  }
                ].map((feature, index) => (
                  <Card
                    key={index}
                    sx={{
                      mb: 3,
                      boxShadow: '0 2px 10px rgba(46,125,50,0.1)',
                      border: '1px solid #E8F5E8',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 20px rgba(46,125,50,0.15)',
                      }
                    }}
                  >
                    <CardContent sx={{ display: 'flex', alignItems: 'flex-start', p: 3 }}>
                      <Box sx={{ mr: 3, mt: 0.5, minWidth: 'auto' }}>
                        {feature.icon}
                      </Box>
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#1B5E20',
                            fontWeight: 600,
                            mb: 1,
                            fontSize: '1.2rem'
                          }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#555',
                            lineHeight: 1.6,
                            fontSize: '0.95rem'
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          bgcolor: '#1B5E20',
          py: { xs: 6, md: 8 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{
              color: 'white',
              fontWeight: 600,
              mb: 2,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            ¿Listo para descubrir tu futuro profesional?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: '1.1rem',
              mb: 4,
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Inicia tu test vocacional ahora y encuentra la carrera perfecta para ti en la Universidad Ricardo Palma
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => setOpenModal(true)}
            sx={{
              bgcolor: '#4CAF50',
              color: 'white',
              px: 5,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: '30px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#66BB6A',
                transform: 'translateY(-2px)',
              }
            }}
          >
            Iniciar Test Ahora
          </Button>
        </Container>
      </Box>
      <ModalStart open={openModal} onClose={() => setOpenModal(false)} />
    </Box>
  );
}