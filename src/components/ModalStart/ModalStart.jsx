import { useState } from "react";
import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  TextField,
  Box,
  Grid,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  MenuItem
} from "@mui/material";
import { saveUser } from "../../services/api";
import { Close as CloseIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function ModalStart({ open, onClose }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    dni: "",
    nivel: "",
    email: "",
    celular: "",
    terms: false
  });
  const [error, setError] = useState("");

  // Opciones para el menú desplegable de nivel de estudios
  const niveles = [
    "Culminé el Colegio",
    "5to de secundaria",
    "4to de secundaria",
    "3ro de secundaria"
  ];

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
    setError("");
  };

  const handleStart = async () => {
  if (!form.nombres || !form.apellidos || !form.dni || !form.nivel || !form.email || !form.celular) {
    setError("Completa todos los campos obligatorios.");
    return;
  }
  if (!form.terms) {
    setError("Debes aceptar las políticas de privacidad.");
    return;
  }

  try {
    const result = await saveUser(form); // Llamada al backend

    if (result.status === "success") {
      localStorage.setItem("usuario_id", result.usuario_id); // <--- Guarda el id
      alert("¡Formulario guardado y completado! Redirigiendo al test...");
      navigate("/test");
    } else {
      setError(result.message || "Error al guardar el usuario.");
    }
  } catch (err) {
    console.error("Error al guardar usuario:", err);
    setError("Ocurrió un error de conexión con el servidor.");
  }
};


  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '24px',
          overflow: 'hidden',
          position: 'relative',
          maxHeight: '90vh',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          width: {
            xs: '95%',   // móviles: casi todo el ancho
            sm: '90%',   // tablets pequeñas
            md: '100%',   // tablets grandes
            lg: '70%',   // desktop
          }
          
        }
      }}
    >
      {/* Botón cerrar */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          backgroundColor: 'rgba(255,255,255,0.2)',
          color: '#1B5E20',
          zIndex: 10,
          backdropFilter: 'blur(10px)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.3)',
          }
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        <Grid 
          container sx={{ minHeight: '600px',
          width: '100%',
          flex: 1
         }}
         >
          {/* Sección izquierda con imagen y título */}
          <Grid 
            item 
            xs={12} 
            md={5} 
            sx={{ 
              background: 'linear-gradient(135deg, #388e3c 0%, #1B5E20 50%, #A5D6A7 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4,
              color: 'white',
              textAlign: 'center',
              position: 'relative',
              minWidth: {
                xs: '100%', // móviles → 100%
                sm: '100%', // tablets pequeñas → 100%
                md: '100%', // medianas → 100%
                lg: 'auto'  // grandes → comportamiento normal (5/12 del grid)
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                pointerEvents: 'none'
              }
            }}
          >
            <Box
              component="img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRJBmRAPLWtq23-HDm-34Y2F2xoLDKzHBXWg&s"
              alt="Test Vocacional"
              sx={{
                width: 160,
                height: 160,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '6px solid rgba(255,255,255,0.3)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                mb: 4,
                position: 'relative',
                zIndex: 1
              }}
            />
            
            <Typography 
              variant="h3" 
              fontWeight="bold" 
              gutterBottom
              sx={{ 
                position: 'relative',
                zIndex: 1,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              Test Vocacional
            </Typography>
            
            <Typography 
              variant="h4" 
              fontWeight="medium" 
              sx={{ 
                opacity: 0.95, 
                mb: 2,
                position: 'relative',
                zIndex: 1,
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              Visualízate
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                opacity: 0.85,
                lineHeight: 1.6,
                maxWidth: '280px',
                position: 'relative',
                zIndex: 1
              }}
            >
              Descubre tu carrera ideal con nuestro test especializado
            </Typography>
          </Grid>

          {/* Sección derecha con formulario */}
          <Grid 
            item 
            xs={12} 
            md={7} 
            sx={{ 
              backgroundColor: '#ffffff',
              p: 5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: { xs: 'center', sm: 'center', md: 'center', lg: 'flex-start' }, 
              textAlign: { xs: 'center', sm: 'center', md: 'center', lg: 'left' },
              minWidth: {
                xs: '100%', // móviles → 100%
                sm: '100%', // tablets pequeñas → 100%
                md: '100%', // medianas → 100%
                lg: 'auto'  // grandes → comportamiento normal (5/12 del grid)
              },
              }}
          >
            <Typography 
              variant="h3" 
              fontWeight="bold" 
              color="#1B5E20" 
              gutterBottom
              sx={{ mb: 4 }}
            >
              Queremos conocerte
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Nombres */}
              <TextField
                label="Nombres*"
                name="nombres"
                value={form.nombres}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="large"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    backgroundColor: '#f8f9fa',
                    fontSize: '1.1rem',
                    '& fieldset': {
                      borderColor: '#C8E6C9',
                      borderWidth: '2px',
                    },
                    '&:hover fieldset': {
                      borderColor: '#388e3c',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#388e3c',
                      borderWidth: '2px',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '1rem',
                    fontWeight: '500',
                    '&.Mui-focused': {
                      color: '#388e3c',
                    },
                  },
                }}
              />

              {/* Apellidos */}
              <TextField
                label="Apellidos*"
                name="apellidos"
                value={form.apellidos}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="large"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    backgroundColor: '#f8f9fa',
                    fontSize: '1.1rem',
                    '& fieldset': {
                      borderColor: '#C8E6C9',
                      borderWidth: '2px',
                    },
                    '&:hover fieldset': {
                      borderColor: '#388e3c',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#388e3c',
                      borderWidth: '2px',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '1rem',
                    fontWeight: '500',
                    '&.Mui-focused': {
                      color: '#388e3c',
                    },
                  },
                }}
              />

              {/* DNI y Celular en fila */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="DNI*"
                    name="dni"
                    value={form.dni}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    size="large"
                    inputProps={{ maxLength: 8 }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        backgroundColor: '#f8f9fa',
                        fontSize: '1.1rem',
                        '& fieldset': {
                          borderColor: '#C8E6C9',
                          borderWidth: '2px',
                        },
                        '&:hover fieldset': {
                          borderColor: '#388e3c',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#388e3c',
                          borderWidth: '2px',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '1rem',
                        fontWeight: '500',
                        '&.Mui-focused': {
                          color: '#388e3c',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Celular*"
                    name="celular"
                    value={form.celular}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                    size="large"
                    inputProps={{ maxLength: 9 }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        backgroundColor: '#f8f9fa',
                        fontSize: '1.1rem',
                        '& fieldset': {
                          borderColor: '#C8E6C9',
                          borderWidth: '2px',
                        },
                        '&:hover fieldset': {
                          borderColor: '#388e3c',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#388e3c',
                          borderWidth: '2px',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '1rem',
                        fontWeight: '500',
                        '&.Mui-focused': {
                          color: '#388e3c',
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>

              {/* Nivel de estudios (menú desplegable) */}
              <TextField
                select
                label="Nivel de estudios"
                name="nivel"
                value={form.nivel}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="large"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    backgroundColor: '#f8f9fa',
                    fontSize: '1.1rem',
                    '& fieldset': {
                      borderColor: '#C8E6C9',
                      borderWidth: '2px',
                    },
                    '&:hover fieldset': {
                      borderColor: '#388e3c',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#388e3c',
                      borderWidth: '2px',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '1rem',
                    fontWeight: '500',
                    '&.Mui-focused': {
                      color: '#388e3c',
                    },
                  },
                }}
              >
                {niveles.map((nivel) => (
                  <MenuItem key={nivel} value={nivel}>
                    {nivel}
                  </MenuItem>
                ))}
              </TextField>

              {/* Email */}
              <TextField
                label="Email*"
                name="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                size="large"
                type="email"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    backgroundColor: '#f8f9fa',
                    fontSize: '1.1rem',
                    '& fieldset': {
                      borderColor: '#C8E6C9',
                      borderWidth: '2px',
                    },
                    '&:hover fieldset': {
                      borderColor: '#388e3c',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#388e3c',
                      borderWidth: '2px',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '1rem',
                    fontWeight: '500',
                    '&.Mui-focused': {
                      color: '#388e3c',
                    },
                  },
                }}
              />

              {/* Checkbox de términos */}
              {/* Checkbox de términos - Versión alternativa */}
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Checkbox 
                  name="terms" 
                  checked={form.terms} 
                  onChange={handleChange}
                  sx={{ 
                    color: "#388e3c",
                    transform: 'scale(1.1)',
                    '&.Mui-checked': {
                      color: "#1B5E20",
                    },
                  }}
                />
                <Typography sx={{ fontSize: '1rem', color: '#495057', ml: 0.5 }}>
                  Acepto las{' '}
                  <Typography 
                    component="span" 
                    sx={{ 
                      color: '#388e3c', 
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      '&:hover': {
                        color: '#1B5E20'
                      }
                    }}
                  >
                    políticas de privacidad
                  </Typography>
                </Typography>
              </Box>
              
              {/* Error message */}
              {error && (
                <Paper
                  sx={{
                    backgroundColor: '#E8F5E9',
                    border: '2px solid #A5D6A7',
                    borderRadius: '12px',
                    p: 2,
                    mt: 2
                  }}
                >
                  <Typography color="#1B5E20" variant="body1" fontWeight="500">
                    {error}
                  </Typography>
                </Paper>
              )}

              {/* Botón principal */}
              <Button
                variant="contained"
                onClick={handleStart}
                fullWidth
                size="large"
                sx={{ 
                  background: 'linear-gradient(135deg, #388e3c 0%, #1B5E20 100%)',
                  color: "white",
                  fontWeight: "bold",
                  py: 2.5,
                  fontSize: '1.2rem',
                  borderRadius: '16px',
                  textTransform: 'none',
                  boxShadow: '0 12px 24px rgba(56, 142, 60, 0.2)',
                  mt: 3,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2E7D32 0%, #388e3c 100%)',
                    boxShadow: '0 16px 32px rgba(56, 142, 60, 0.3)',
                    transform: 'translateY(-2px)',
                  },
                  '&:active': {
                    transform: 'translateY(0px)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Siguiente
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}