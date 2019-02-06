package utils

import (
	"net/http"
	"reflect"
	"math"
	"fmt"
	"encoding/json"	 
)

// Utility function to typecast interfaces to floats
func GetFloat(unk interface{}) (float64, error) {
	
	// Needed for float conversion. Holds the type in a var
	var floatType = reflect.TypeOf(float64(0))
	
    v := reflect.ValueOf(unk)
    v = reflect.Indirect(v)
    if !v.Type().ConvertibleTo(floatType) {
        return math.NaN(), fmt.Errorf("cannot convert %v to float64", v.Type())
    }
    fv := v.Convert(floatType)
    return fv.Float(), nil
}

// Utility function that forms the final JSON response 
// with appropriate headers 
func Respond(w http.ResponseWriter, data map[string]string, httpStatus string)  {
	w.Header().Add("Content-Type", "application/json")
	
	if httpStatus == "OK" {
		w.WriteHeader(http.StatusOK)
	} else{
		w.WriteHeader(http.StatusBadRequest)
	}
	
	json.NewEncoder(w).Encode(data)
}

