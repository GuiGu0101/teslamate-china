defmodule TeslaMate.Repo.Migrations.AddCoordTypeToPosition do
  use Ecto.Migration

  def change do
    alter table(:positions) do
      add(:coord_type, :string, null: true, size: 20)
    end
  end
end
