package main

import (
    "log"
    "net/http"
    "fmt"
    "time"
    "github.com/gorilla/mux"
    "RecommendationEngine/controllers"
    "github.com/samuel/go-zookeeper/zk"
    "io/ioutil"
    "bytes"
)

func main() {

    router := mux.NewRouter()
    router.HandleFunc("/getRecommendedValence", controllers.PreflightGetRecommendedValence).Methods("OPTIONS")
    router.HandleFunc("/getRecommendedValence", controllers.GetRecommendedValence).Methods("GET")


     // ----------------------- Zookeeper registration -----------------------------//

    // Making request to get IP of current machine dynamically
    request, _ := http.NewRequest("GET", "https://ip.42.pl/raw", nil)
    client := &http.Client{}
    response, err := client.Do(request)
    data, _ := ioutil.ReadAll(response.Body)
    response.Body = ioutil.NopCloser(bytes.NewBuffer(data))
    currentVMIPAddr := string(data)



    // Connecting to ZK on jetStream VM..hardcoded ip is okay!
    c, _, err := zk.Connect([]string{"149.165.170.7:2181"}, time.Second) 
    if err != nil {
        fmt.Println("[RecoEngine] Err connecting with ZK %s",err)
        panic(err)
    }
    fmt.Println("[RecoEngine] Connected to ZK", )

    acl := zk.WorldACL(1)

    res, err := c.Create("/RecoEngine", []byte(currentVMIPAddr+":8001"), 1, acl)
    if err != nil {
        fmt.Println("[RecoEngine] ERROR WHILE CREATING ZK NODE!!")
        panic(err)
    }

    fmt.Printf("[RecoEngine] Successfully created ZK Node: %+v\n", res)

    // ----------------------- Zookeeper registration ends -----------------------------//

    // Starting the Go server
    fmt.Println("[RecoEngine] Starting Go Server at 8001...")
    log.Fatal(http.ListenAndServe(":8001", router))

}
