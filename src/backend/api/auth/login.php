
<?php

require_once __DIR__ . "/config.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Only POST requests are allowed."
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$email = strtolower(trim($data["email"] ?? ""));
$password = $data["password"] ?? "";

if ($email === "" || $password === "") {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Email and password are required."
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare(
        "SELECT id, username, email, password
         FROM users
         WHERE email = ?"
    );

    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user["password"])) {
        http_response_code(401);
        echo json_encode([
            "success" => false,
            "message" => "Invalid email or password."
        ]);
        exit;
    }

    session_regenerate_id(true);

    $_SESSION["user_id"] = $user["id"];

    echo json_encode([
        "success" => true,
        "message" => "Login successful!",
        "user" => [
            "id" => $user["id"],
            "username" => $user["username"],
            "email" => $user["email"]
        ]
    ]);

} catch (PDOException $e) {
    error_log($e->getMessage());

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Login failed. Please try again."
    ]);
}
