
import { jwtDecode } from "jwt-decode";


function validToken() {
    const jwtToken = localStorage.getItem('jwtToken');
    console.log("AA")
    if (jwtToken) {
        try {
            console.log("BA")
            const decoded = jwtDecode(jwtToken);

            console.log(decoded)
            if (!decoded) {
                console.log("AG")
                return false;
            }

            console.log("CA")
            const currentTimestamp = Math.floor(Date.now() / 1000);

            if (decoded.exp && decoded.exp < currentTimestamp) {
                console.log("FG")
                return false;
            }

            if (decoded.nbf && decoded.nbf > currentTimestamp) {
                console.log("G")
                return false;
            }

            return true;
        } catch (error) {
            return false;
        }
    } else {
        return false;
    }
}


function getName() {
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
        try {
            const decoded = jwtDecode(jwtToken);
            if (decoded) {
                if (decoded.sub) {
                    return decoded.sub;
                } else {
                    return "";
                }
            } else {
                return "";
            }
        } catch (error) {
            return "";
        }
    } else {
        return null;
    }
}


export {validToken, getName}