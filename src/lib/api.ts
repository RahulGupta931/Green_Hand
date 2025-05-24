import { supabase } from './supabase';
import { Product, Banner, FAQ, Order, Category } from '../types';

// Products
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Product[];
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();
  
  if (error) throw error;
  return data as Product;
}

export async function updateProduct(id: string, updates: Partial<Product>) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Product;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

// Categories
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data as Category[];
}

export async function createCategory(name: string) {
  const { data, error } = await supabase
    .from('categories')
    .insert({ name })
    .select()
    .single();
  
  if (error) throw error;
  return data as Category;
}

export async function updateCategory(id: string, name: string) {
  const { data, error } = await supabase
    .from('categories')
    .update({ name })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Category;
}

export async function deleteCategory(id: string) {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

// Banners
export async function getBanners() {
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Banner[];
}

export async function createBanner(banner: Omit<Banner, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('banners')
    .insert(banner)
    .select()
    .single();
  
  if (error) throw error;
  return data as Banner;
}

export async function updateBanner(id: string, updates: Partial<Banner>) {
  const { data, error } = await supabase
    .from('banners')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Banner;
}

export async function deleteBanner(id: string) {
  const { error } = await supabase
    .from('banners')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

// FAQs
export async function getFAQs() {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('order');
  
  if (error) throw error;
  return data as FAQ[];
}

export async function createFAQ(faq: Omit<FAQ, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('faqs')
    .insert(faq)
    .select()
    .single();
  
  if (error) throw error;
  return data as FAQ;
}

export async function updateFAQ(id: string, updates: Partial<FAQ>) {
  const { data, error } = await supabase
    .from('faqs')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as FAQ;
}

export async function deleteFAQ(id: string) {
  const { error } = await supabase
    .from('faqs')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}

// Orders
export async function getOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      items:order_items(
        *,
        product:products(*)
      )
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Order[];
}

export async function updateOrderStatus(id: string, status: Order['status']) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as Order;
}

export async function exportOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      items:order_items(
        *,
        product:products(*)
      )
    `)
    .csv();
  
  if (error) throw error;
  return data;
}