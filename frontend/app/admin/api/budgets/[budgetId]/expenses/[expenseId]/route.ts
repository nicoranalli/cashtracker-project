import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { budgetId: string; expenseId: string } }
) {
  const { budgetId, expenseId } = params;

  const url = `${process.env.BACKEND_URL}/budgets/${budgetId}/expenses/${expenseId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${req.headers.get("Authorization")}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    return new Response(JSON.stringify({ error: errorData.error }), {
      status: response.status,
    });
  }

  const data = await response.json();
  return new Response(JSON.stringify(data), { status: 200 });
}