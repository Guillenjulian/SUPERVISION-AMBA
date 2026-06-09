import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Cliente {
  id: string;
  nombre: string;
}

interface Sucursal {
  id: string;
  nombre: string;
  cliente_id: string;
}

export function useClientesSucursales(clienteNombre: string) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [cargando, setCargando] = useState(true);

  // Cargar todos los clientes al montar
  useEffect(() => {
    supabase
      .from('clientes')
      .select('id, nombre')
      .eq('activo', true)
      .order('nombre')
      .then(({ data }) => {
        if (data) setClientes(data);
        setCargando(false);
      });
  }, []);

  // Cargar sucursales cuando cambia el cliente seleccionado
  useEffect(() => {
    if (!clienteNombre) {
      setSucursales([]);
      return;
    }
    const cliente = clientes.find(
      (c) => c.nombre.toLowerCase() === clienteNombre.toLowerCase()
    );
    if (!cliente) {
      setSucursales([]);
      return;
    }
    supabase
      .from('sucursales')
      .select('id, nombre, cliente_id')
      .eq('cliente_id', cliente.id)
      .eq('activo', true)
      .order('nombre')
      .then(({ data }) => {
        if (data) setSucursales(data);
      });
  }, [clienteNombre, clientes]);

  return {
    clientesNombres: clientes.map((c) => c.nombre),
    sucursalesNombres: sucursales.map((s) => s.nombre),
    cargando,
  };
}
