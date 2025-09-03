export const brand = '#e20a17';


export const card = {
base: {
background: '#101114',
border: '1px solid #1d1f26',
borderRadius: 16,
padding: 20,
boxShadow: '0 6px 24px rgba(0,0,0,0.25)'
},
};


export const button = (variant = 'primary') => {
const base = {
padding: '12px 16px',
borderRadius: 12,
border: 'none',
fontWeight: 600,
cursor: 'pointer',
transition: 'transform 0.06s ease, box-shadow 0.2s ease, opacity 0.2s',
outline: 'none'
};
const variants = {
primary: {
background: brand,
color: '#fff',
boxShadow: '0 8px 20px rgba(226,10,23,0.35)'
},
ghost: {
background: 'transparent',
color: '#d6d8e0',
border: '1px solid #2a2d37'
}
};
return { ...base, ...variants[variant] };
};


export const input = {
base: {
width: '100%',
background: '#0b0c0f',
border: '1px solid #222530',
color: '#e9ebf0',
padding: '12px 14px',
borderRadius: 12,
outline: 'none'
}
};


export const label = {
base: { color: '#b8bcc7', fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }
};