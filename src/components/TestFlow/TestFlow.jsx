import { useEffect, useState } from "react";
import { Box, Button, Typography, Paper, Fade, Chip, Grid, Card, CardContent, Avatar, Divider } from "@mui/material";
import { getProcesses, getQuestions, saveResponses, saveSuggestion, getCareers, getAreas } from "../../services/api";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const ProgressBar = ({ value }) => (
  <Box sx={{ mb: 4 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
      <Typography variant="body2" color="#2e7d32" fontWeight="600">Progreso del Test</Typography>
      <Typography variant="body2" color="#2e7d32" fontWeight="600">{Math.round(value)}%</Typography>
    </Box>
    <Box sx={{ height: 12, borderRadius: 6, backgroundColor: '#e8f5e8', overflow: 'hidden' }}>
      <Box sx={{ width: `${value}%`, height: '100%', background: 'linear-gradient(90deg, #4caf50 0%, #2e7d32 100%)', borderRadius: 6, transition: 'width 0.3s' }} />
    </Box>
  </Box>
);

const ResultsView = ({ areaInfo, carreras, onRestart }) => (
  <Box sx={{ 
    minHeight: '100vh', 
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    py: 3,
    px: { xs: 3, sm: 4, md: 2 }
  }}>
    <Fade in={true} timeout={800}>
      <Box sx={{ 
        maxWidth: 1000, 
        width: '100%', 
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
      }}>
        {/* Header de Resultados */}
        <Paper 
          elevation={0} 
          sx={{ 
            borderRadius: '20px',
            mb: 3,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
            color: 'white',
            position: 'relative',
            width: '100%'
          }}
        >
          <Box sx={{ p: 4, textAlign: 'center', position: 'relative' }}>
            <Box sx={{
              position: 'absolute',
              top: -15,
              right: -15,
              width: 150,
              height: 150,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              zIndex: 0
            }} />
            <Box sx={{
              position: 'absolute',
              bottom: -20,
              left: -20,
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              zIndex: 0
            }} />
            
            <Avatar sx={{ 
              width: 70,
              height: 70, 
              mx: 'auto', 
              mb: 2,
              bgcolor: 'rgba(255,255,255,0.2)',
              position: 'relative',
              zIndex: 1
            }}>
              <CheckCircleIcon sx={{ fontSize: 40, color: 'white' }} />
            </Avatar>
            
            <Typography 
              variant="h4"
              fontWeight="bold" 
              gutterBottom
              sx={{ position: 'relative', zIndex: 1 }}
            >
              ¡Felicitaciones!
            </Typography>
            
            <Typography 
              variant="body1"
              sx={{ opacity: 0.9, position: 'relative', zIndex: 1 }}
            >
              Has completado exitosamente tu test vocacional
            </Typography>
          </Box>
        </Paper>

        {/* Perfil Vocacional */}
        <Paper 
          elevation={0} 
          sx={{ 
            borderRadius: '16px',
            p: 3,
            border: '2px solid #b9f6ca',
            background: 'linear-gradient(135deg, #ffffff 0%, #f9fff9 100%)',
            width: '100%',
            mb: 3
          }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ 
                width: 50, 
                height: 50, 
                mr: 2, 
                bgcolor: '#4caf50' 
              }}>
                <TrendingUpIcon sx={{ fontSize: 24 }} />
              </Avatar>
              <Box>
                <Typography variant="h6" color="#2e7d32" fontWeight="600">
                  Tu Perfil Vocacional
                </Typography>
                <Typography variant="caption" color="#666">
                  Basado en tus respuestas
                </Typography>
              </Box>
            </Box>
            
            <Divider sx={{ my: 2, borderColor: '#b9f6ca' }} />

            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              py: 2
            }}>
              <Box
                sx={{
                  px: 4,
                  py: 2.5,
                  backgroundColor: '#e8f5e8',
                  borderRadius: '16px',
                  border: '2px solid #b9f6ca',
                  minWidth: '300px',
                  mb: 2
                }}
              >
                <Typography 
                  variant="h5" 
                  color="#2e7d32" 
                  fontWeight="bold"
                >
                  {areaInfo ? areaInfo.nombre : "Área no identificada"}
                </Typography>
              </Box>
              
              <Typography 
                variant="body2"
                color="#666"
                sx={{ maxWidth: '400px', lineHeight: 1.6, mb: 2 }}
              >
                {areaInfo 
                  ? "Esta área se alinea perfectamente con tus intereses y aptitudes detectados en el test."
                  : "No pudimos identificar un área específica. Te recomendamos realizar el test nuevamente para obtener mejores resultados."
                }
              </Typography>

              {areaInfo && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: '#4caf50',
                    mr: 1
                  }} />
                  <Typography variant="caption" color="#4caf50" fontWeight="600">
                    Compatibilidad Alta
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>

        {/* Carreras Recomendadas */}
        <Paper 
            elevation={0} 
            sx={{ 
              borderRadius: '16px',
              p: 3,
              border: '2px solid #b9f6ca',
              background: 'linear-gradient(135deg, #ffffff 0%, #f9fff9 100%)',
              width: '100%'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ 
                width: 50,
                height: 50, 
                mr: 2, 
                bgcolor: '#4caf50' 
              }}>
                <SchoolIcon sx={{ fontSize: 24 }} />
              </Avatar>
              <Box>
                <Typography variant="h6" color="#2e7d32" fontWeight="600">
                  Carreras Recomendadas
                </Typography>
                <Typography variant="caption" color="#666">
                  {carreras.length} opciones encontradas
                </Typography>
              </Box>
            </Box>
            
            <Divider sx={{ my: 2, borderColor: '#b9f6ca' }} />
            
            <Box sx={{ 
              maxHeight: 300,
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: 6,
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: 3,
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#4caf50',
                borderRadius: 3,
              },
            }}>
              {carreras.length > 0 ? (
                <Grid container spacing={1.5}>
                  {carreras.map((carrera, index) => (
                    <Grid item xs={12} key={carrera.id}>
                      <Card 
                        elevation={0}
                        sx={{ 
                          border: '1px solid #b9f6ca',
                          borderRadius: '8px',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-1px)',
                            boxShadow: '0 3px 15px rgba(76, 175, 80, 0.15)',
                            borderColor: '#4caf50'
                          }
                        }}
                      >
                        <CardContent sx={{ p: 1.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              background: `linear-gradient(45deg, #4caf50, #2e7d32)`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 1.5,
                              color: 'white',
                              fontSize: '14px',
                              fontWeight: 'bold'
                            }}>
                              {index + 1}
                            </Box>
                            <Typography 
                              variant="body1"
                              color="#2e7d32" 
                              fontWeight="600"
                              sx={{ flex: 1, fontSize: '0.95rem' }}
                            >
                              {carrera.nombre}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body2" color="#666">
                    No se encontraron carreras para esta área
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>

        {/* Acciones */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            onClick={onRestart}
            variant="contained"
            size="medium"
            startIcon={<RestartAltIcon />}
            sx={{
              backgroundColor: '#4caf50',
              color: 'white',
              px: 3,
              py: 1.5,
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              textTransform: 'none',
              boxShadow: '0 6px 20px rgba(76, 175, 80, 0.3)',
              '&:hover': {
                backgroundColor: '#2e7d32',
                transform: 'translateY(-1px)',
                boxShadow: '0 8px 24px rgba(76, 175, 80, 0.4)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            Realizar Test Nuevamente
          </Button>
          
          <Typography 
            variant="caption"
            color="#666" 
            sx={{ mt: 1.5, display: 'block' }}
          >
            ¿Quieres explorar otras opciones? Puedes repetir el test cuando gustes
          </Typography>
        </Box>
      </Box>
    </Fade>
  </Box>
);

export default function TestFlow() {
  const [proceso, setProceso] = useState(null);
  const [preguntas, setPreguntas] = useState([]);
  const [current, setCurrent] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [finished, setFinished] = useState(false);

  const [areaInfo, setAreaInfo] = useState(null);
  const [carreras, setCarreras] = useState([]);
  const [loading, setLoading] = useState(true);

  const usuario_id = localStorage.getItem("usuario_id");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const procesos = await getProcesses();
        const procesoActivo = procesos[0];
        setProceso(procesoActivo);
        const preguntasBD = await getQuestions(procesoActivo.id);
        setPreguntas(preguntasBD);
      } catch (e) {
        console.error("Error cargando datos:", e);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // Función para determinar si una opción indica interés
  const esOpcionDeInteres = (textoOpcion) => {
    const palabrasInteres = ["me interesa", "me gusta", "me atrae", "sí", "si", "me agrada", "me llama"];
    const texto = textoOpcion.toLowerCase();
    return palabrasInteres.some(palabra => texto.includes(palabra));
  };

  // Calcular sugerencia cuando termine
useEffect(() => {
  if (finished && respuestas.length === preguntas.length) {
    const areaCount = {};
    console.log("=== INICIANDO CÁLCULO DE ÁREA SUGERIDA ===");

    // Contar solo las respuestas de "Me interesa"
    respuestas.forEach((respuesta) => {
      const pregunta = preguntas.find(p => Number(p.id) === Number(respuesta.pregunta_id));
      if (!pregunta) {
        console.warn("❌ Pregunta no encontrada:", respuesta.pregunta_id);
        return;
      }

      const opcion = pregunta.opciones.find(o => Number(o.id) === Number(respuesta.opcion_id));
      if (!opcion) {
        console.warn("❌ Opción no encontrada:", respuesta.opcion_id);
        return;
      }

      // DEBUG: Mostrar información de cada opción
      console.log(`🔍 Pregunta: ${pregunta.texto.substring(0, 30)}...`);
      console.log(`   Opción: ${opcion.texto}`);
      console.log(`   Área: ${opcion.area_id}`);

      // SOLUCIÓN CORREGIDA: Solo contar las opciones que son EXACTAMENTE "Me interesa"
      if (opcion.texto.toLowerCase() === "me interesa") {
        const areaIdNum = Number(opcion.area_id);
        areaCount[areaIdNum] = (areaCount[areaIdNum] || 0) + 1;
        console.log(`✅ Área ${areaIdNum} sumada (Me interesa), total: ${areaCount[areaIdNum]}`);
      } else if (opcion.texto.toLowerCase() === "no me interesa") {
        console.log(`➖ Opción "${opcion.texto}" ignorada (No me interesa)`);
      } else {
        console.log(`❓ Opción desconocida: "${opcion.texto}"`);
      }
    });

    console.log("📊 Conteo final por áreas (solo 'Me interesa'):", areaCount);

    // Resto del código permanece igual...
    // Encontrar área con mayor puntuación
    const areasEntries = Object.entries(areaCount);
    let area_id = null;
    
    if (areasEntries.length > 0) {
      // Ordenar por cantidad de votos (descendente)
      areasEntries.sort((a, b) => b[1] - a[1]);
      
      // Verificar si hay un área claramente predominante (al menos 20% más que la segunda)
      if (areasEntries.length === 1 || areasEntries[0][1] > areasEntries[1][1] * 1.2) {
        area_id = Number(areasEntries[0][0]);
        console.log(`🎯 Área ${area_id} seleccionada con ${areasEntries[0][1]} votos`);
      } else {
        console.log("🤔 No hay un área claramente predominante, mostrando resultados mixtos");
        // En caso de empate, no establecer un área específica
      }
    } else {
      console.log("⚠️ No se seleccionaron opciones de 'Me interesa'");
    }

    // Guardar respuestas en BD
    saveResponses(usuario_id, proceso.id, respuestas);

    if (area_id) {
      console.log("💾 Guardando sugerencia para área:", area_id);
      saveSuggestion(usuario_id, area_id);

      // Traer carreras de esa área
      getCareers(area_id)
        .then(carrerasData => {
          console.log("📚 Carreras obtenidas:", carrerasData);
          setCarreras(carrerasData);

          // Traer información del área
          getAreas()
            .then(areasData => {
              console.log("🌐 Áreas obtenidas desde BD:", areasData);
              const areaFromDB = areasData.find(a => Number(a.id) === area_id);
              
              if (areaFromDB) {
                setAreaInfo(areaFromDB);
                console.log("✅ Área encontrada en BD:", areaFromDB);
              } else {
                setAreaInfo({ id: area_id, nombre: `Área ${area_id}` });
                console.warn("⚠️ Área no encontrada en BD, usando fallback");
              }
            })
            .catch(error => {
              console.error("❌ Error obteniendo áreas:", error);
              setAreaInfo({ id: area_id, nombre: `Área ${area_id}` });
            });
        })
        .catch(error => {
          console.error("❌ Error obteniendo carreras:", error);
          setCarreras([]);
        });
    } else {
      console.log("⚠️ No se pudo determinar un área sugerida claramente");
      setCarreras([]);
      setAreaInfo(null);
    }

    console.log("=== FIN CÁLCULO DE ÁREA SUGERIDA ===");
  }
}, [finished, respuestas, preguntas, usuario_id, proceso]);

  const handleRestart = () => {
    setCurrent(0);
    setRespuestas([]);
    setFinished(false);
    setAreaInfo(null);
    setCarreras([]);
  };

  if (loading) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
      }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: '16px', textAlign: 'center' }}>
          <Typography variant="h5" color="#2e7d32" fontWeight="600">
            Cargando test...
          </Typography>
        </Paper>
      </Box>
    );
  }

  // Mostrar resultados si el test ha terminado
  if (finished) {
    return (
      <ResultsView 
        areaInfo={areaInfo}
        carreras={carreras}
        onRestart={handleRestart}
      />
    );
  }

  const preguntaActual = preguntas[current];
  if (!preguntaActual) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
      }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: '16px', textAlign: 'center' }}>
          <Typography variant="h5" color="#2e7d32" fontWeight="600">
            Cargando test...
          </Typography>
        </Paper>
      </Box>
    );
  }

  const handleRespuesta = (opcion_id) => {
    setRespuestas(prev => [...prev, { pregunta_id: preguntaActual.id, opcion_id }]);
    if (current < preguntas.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const progress = ((current + 1) / preguntas.length) * 100;

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      width: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      py: 4,
      px: 2
    }}>
      <Fade in={true} timeout={600} key={current}>
        <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
          {/* Barra de progreso mejorada */}
          <Box sx={{ mb: 4 }}>
            <ProgressBar value={progress} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1" color="#2e7d32" fontWeight="600">
                Pregunta {current + 1} de {preguntas.length}
              </Typography>
              <Chip 
                label={`${Math.round(progress)}% Completado`} 
                color="success" 
                variant="outlined" 
                sx={{ fontWeight: 600 }}
              />
            </Box>
          </Box>

          <Paper 
            elevation={0} 
            sx={{ 
              borderRadius: '32px', 
              overflow: 'hidden',
              border: '3px solid #b9f6ca',
              boxShadow: '0 16px 48px rgba(76, 175, 80, 0.15)'
            }}
          >
            {/* Pregunta mejorada */}
            <Box sx={{ 
              borderBottom: '3px solid #b9f6ca', 
              p: 4, 
              textAlign: 'center',
              background: 'linear-gradient(135deg, #ffffff 0%, #f9fff9 100%)'
            }}>
              <Typography 
                variant="h4" 
                color="#2e7d32" 
                fontWeight="bold"
                sx={{ lineHeight: 1.3 }}
              >
                {preguntaActual.texto}
              </Typography>
            </Box>
            
            {/* Opciones mejoradas */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              height: { xs: 'auto', sm: 250 } 
            }}>
              {preguntaActual.opciones.map((op, idx) => (
                <Box
                  key={op.id}
                  sx={{
                    flex: 1,
                    borderRight: idx === 0 ? { sm: '3px solid #b9f6ca', xs: 'none' } : 'none',
                    borderBottom: idx === 0 ? { xs: '3px solid #b9f6ca', sm: 'none' } : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <Button
                    onClick={() => handleRespuesta(op.id)}
                    variant="contained"
                    fullWidth
                    sx={{
                      height: { xs: 120, sm: 250 },
                      borderRadius: 0,
                      background: 'linear-gradient(135deg, #90EE90 0%, #7dd87d 100%)',
                      color: "#2e7d32",
                      fontSize: { xs: 28, sm: 32 },
                      fontWeight: 600,
                      textTransform: 'none',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      "&:hover": { 
                        background: 'linear-gradient(135deg, #77d677 0%, #66cc66 100%)',
                        transform: 'scale(1.02)',
                        boxShadow: '0 8px 24px rgba(76, 175, 80, 0.3)'
                      },
                      "&:before": {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        transition: 'left 0.5s ease',
                      },
                      "&:hover:before": {
                        left: '100%'
                      }
                    }}
                  >
                    {op.texto}
                  </Button>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      </Fade>
    </Box>
  );
}