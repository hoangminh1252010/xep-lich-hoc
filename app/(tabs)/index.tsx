import axios from "axios";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
    useEffect(() => {
        axios.get("http://192.168.1.143:5000/api/ping")
          .then(res => {
            console.log("✅ Kết nối backend:", res.data);
          })
          .catch(err => {
            console.error("❌ Lỗi kết nối:", err.message);
          });
      }, []);
    
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Trang chủ</Text>
        </View>
      );
}
