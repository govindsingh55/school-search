// lat: 26.837730 long: 83.710610
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat");
    const long = searchParams.get("long");
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=school&key=${process.env.MAP_API_KEY}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    // console.log("json data : ", data, searchParams);
    // console.log("json data : ", `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=school&key=${process.env.MAP_API_KEY}`);
    return NextResponse.json({ data });
  } catch (error) {
    console.log("error : ", error);
  }
}
