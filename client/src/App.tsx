import { useEffect, useState } from 'react';

function App() {
	const [loading, setLoading] = useState(false);
	const [pregunta, setPregunta] = useState('');
	const [id, setId] = useState('');
	const [publicacion, setPublicacion] = useState('');
	const [link, setLink] = useState('');
	const [values, setValues] = useState({ publicacion: true, formulario: true });

	const onOptionChange = (field: string) => (e: any) => {
		const val = e.target.value === 'true' ? true : false;
		setValues({ ...values, [field]: val });
	};

	const fetchPregunta = () => {
		setLoading(true);
		fetch(`${process.env.REACT_APP_API_ROUTE}/pregunta`)
			.then((data) => data.json())
			.then((data) => {
				setPregunta(data.texto);
				setId(data.id);
				setPublicacion(data.publicacion.htmlData);
				setLink(`https://articulo.mercadolibre.com.ar/MLA-${data.publicacion.meLiId}`);
				setValues({ publicacion: true, formulario: true });
			})
			.finally(() => setLoading(false));
	};

	const setResultado = () => {
		setLoading(true);
		fetch(`${process.env.REACT_APP_API_ROUTE}/resultado/${id}`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(values)
		}).finally(() => fetchPregunta());
	};

	useEffect(() => {
		fetchPregunta();
	}, []);

	return (
		<>
			{loading && <div id="telon">cargando...</div>}
			<div className="divMain">
				<div className="divConsola">
					<h1>Smarply</h1>
					<h3>Pregunta</h3>
					<div className="wrapper" style={{ flexDirection: 'column' }}>
						<div id="divPregunta">{pregunta}</div>
						<a href={link} id="btnLink" target="_blank">
							Abrir publicación en Mercado Libre
						</a>
					</div>
					<h3>Puede responderse con la publicación</h3>
					<div className="wrapper">
						<input
							type="radio"
							className="input_si"
							name="publicacion"
							id="publicacion_si"
							value="true"
							checked={values.publicacion}
							onChange={onOptionChange('publicacion')}
						/>
						<input
							type="radio"
							className="input_no"
							name="publicacion"
							id="publicacion_no"
							value="false"
							checked={!values.publicacion}
							onChange={onOptionChange('publicacion')}
						/>
						<label htmlFor="publicacion_si" className="option option-si">
							<div className="dot"></div>
							<span>Sí</span>
						</label>
						<label htmlFor="publicacion_no" className="option option-no">
							<div className="dot"></div>
							<span>No</span>
						</label>
					</div>
					<h3>Puede responderse con el formulario</h3>
					<div className="wrapper">
						<input
							type="radio"
							className="input_si"
							name="formulario"
							id="form_si"
							value="true"
							checked={values.formulario}
							onChange={onOptionChange('formulario')}
						/>
						<input
							type="radio"
							className="input_no"
							name="formulario"
							id="form_no"
							value="false"
							checked={!values.formulario}
							onChange={onOptionChange('formulario')}
						/>
						<label htmlFor="form_si" className="option option-si">
							<div className="dot"></div>
							<span>Sí</span>
						</label>
						<label htmlFor="form_no" className="option option-no">
							<div className="dot"></div>
							<span>No</span>
						</label>
					</div>
					<h3></h3>
					<div className="wrapper">
						<button onClick={setResultado} id="btnPregunta">
							Aceptar
						</button>
						<button onClick={fetchPregunta} id="btnPregunta">
							Cancelar
						</button>
					</div>
				</div>
				<div id="divMeLi" dangerouslySetInnerHTML={{ __html: publicacion }} />
			</div>
		</>
	);
}

export default App;
