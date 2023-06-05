export default function Validation(newActivity){
    let regex =  /^[a-zA-Z\s]*$/;
    let regex2 = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i'
    );

    let error = {} 
    // Validar name
    if(newActivity.name === '' || !regex.test(newActivity.name)){
      error.name =
      'El Nombre es Obligario';
    }
    // Validar difficulty
    if(newActivity.difficulty === ''){
      error.difficulty = 'La dificultad es obligatoria para crear su Actividad';
    }
    // Validar duration
    if(newActivity.duration === ''){
      error.duration = 'La duración es obligatoria para crear su Actividad';
    }
    // validar season
    if(newActivity.season === ''){
      error.season = 'La estacion es obligatoria para crear su Actividad';
    }
    //validar country
    if(newActivity.country === 0){
      error.country = 'El país es obligatorio para crear su Actividad, debe escoger al  menos unos';
    }
    return error;
}