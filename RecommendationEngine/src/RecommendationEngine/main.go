package main

import (
    "log"
    "net/http"
    "fmt"
    "github.com/gorilla/mux"
    "RecommendationEngine/controllers"
)

func main() {
    
    router := mux.NewRouter()
    router.HandleFunc("/getRecommendedValence", controllers.PreflightGetRecommendedValence).Methods("OPTIONS")
    router.HandleFunc("/getRecommendedValence", controllers.GetRecommendedValence).Methods("GET")
   
    fmt.Println("[RecoEngine] Starting Go Server at 8001...")
    log.Fatal(http.ListenAndServe(":8001", router))
    
}
