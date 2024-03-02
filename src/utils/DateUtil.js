
function createDateFromArray(dateArray) {

    let normalDate;

    

    switch (dateArray.length) {
        case 1: {
            normalDate = new Date(dateArray[0])
            break;
        }
        case 2: {
            normalDate = new Date(dateArray[0],dateArray[1]-1)
            break;
        }
        case 3: {
            normalDate = new Date(dateArray[0],dateArray[1]-1,dateArray[2])
            break;
        }
        case 4: {
            normalDate = new Date(dateArray[0],dateArray[1]-1,dateArray[2],dateArray[3]+1)
            break;
        }
        case 5: {
            normalDate = new Date(dateArray[0],dateArray[1]-1,dateArray[2],dateArray[3]+1,dateArray[4])
            break;
        }
        case 6: {
            normalDate = new Date(dateArray[0],dateArray[1]-1,dateArray[2],dateArray[3]+1,dateArray[4],dateArray[5])
            break;
        }
        case 7: {
            normalDate = new Date(dateArray[0],dateArray[1]-1,dateArray[2],dateArray[3]+1,dateArray[4],dateArray[5])
            break;
        }
        default: {
            normalDate = new Date()
        }
    }

    return `${normalDate.getUTCHours().toString().padStart(2, '0')}:${normalDate.getUTCMinutes().toString().padStart(2, '0')}, ${normalDate.getUTCDate().toString().padStart(2, '0')}-${(normalDate.getUTCMonth() + 1).toString().padStart(2, '0')}-${normalDate.getUTCFullYear()}`;

}

export default createDateFromArray