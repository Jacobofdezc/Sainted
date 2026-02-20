import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("comentarios")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return res.status(500).json(error);
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const { nombre, mensaje } = req.body;

    if (!nombre || !mensaje) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    const { error } = await supabase
      .from("comentarios")
      .insert([{ nombre, mensaje }]);

    if (error) return res.status(500).json(error);
    return res.status(200).json({ success: true });
  }

  res.status(405).end();
}