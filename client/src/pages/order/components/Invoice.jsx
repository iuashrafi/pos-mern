import { useState } from "react";
import {
  Page,
  Text,
  View,
  Link,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { calculateTotalCost } from "../../../lib/helper";

const styles = StyleSheet.create({
  page: {
    padding: 16,
    fontSize: 11,
  },
  header: {
    backgroundColor: "pink",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  billTo: {
    paddingHorizontal: 10,
    paddingVertical: 16,
  },

  bill: {
    header: {
      backgroundColor: "#D3D3D3",
      padding: 10,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
    },
    footer: {
      padding: 10,
      border: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
});

const Invoice = ({ order }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={{ fontSize: 16 }}>Invoice</Text>
          <Text>Date______________</Text>
        </View>

        <View style={styles.billTo}>
          <Text>Bill To</Text>
          <Text>Name: {order.customer_name}</Text>
          <Text>Contact: {order.customer_contact.phone}</Text>
        </View>

        <View style={styles.bill.header}>
          <Text>Particulars</Text>
          <Text>Qt.</Text>
          <Text>Amount</Text>
        </View>
        {order.cartItems.map((item, index) => (
          <View key={index} style={styles.bill.row}>
            <Text>{item.id.name}</Text>
            <Text>{item.qt}</Text>
            <Text>{item.qt * item.price}</Text>
          </View>
        ))}

        <View style={styles.bill.footer}>
          <Text>Total</Text>
          <Text>{calculateTotalCost(order)}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
