use tauri::{AppHandle, Emitter};

#[tauri::command]
fn load_files(app: AppHandle) {
    let args: Vec<String> = std::env::args().collect();

    if args.len() > 1 {
        let opened_file_path = &args[1];
        app.emit("file-loaded", opened_file_path).unwrap();
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![load_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
